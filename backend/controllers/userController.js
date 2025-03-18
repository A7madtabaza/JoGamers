const User = require("../Models/User");
const jwt = require("jsonwebtoken");

// إنشاء توكن JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// تسجيل مستخدم جديد
exports.register = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;

    // التحقق من وجود المستخدم مسبقًا
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // إنشاء مستخدم جديد
    const user = await User.create({ username, email, password,role });

    // إنشاء توكن
    const token = generateToken(user._id);

    // إرسال التوكن في الكوكيز
    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
