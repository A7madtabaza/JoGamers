// import { useState } from "react";
// import Navbar from "../navbar/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
// const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Sending data:", { username, email, password }); // تسجيل البيانات المرسلة

//       const response = await axios.post(
//         "http://localhost:5000/api/users/register",
//         {
//           username,
//           email,
//           password,
//         }
//       );

//       console.log("Response:", response.data); // تسجيل استجابة الخادم

//       setMessage(response.data.message);
//       if (response.data.message === "User registered successfully") {
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Registration error:", error); // تسجيل تفاصيل الخطأ
//       setMessage(
//         error.response
//           ? error.response.data.message
//           : "Registration failed. Please try again."
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-[#EFF5F5] p-4">
//         <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Image Section - Full Size (Left side) */}
//           <div className="w-full md:w-1/2 relative h-64 md:h-auto order-2 md:order-1">
//             <img
//               src="https://www.sqorebda3.com/vb/attachments/16229/"
//               alt="Registration"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </div>

//           {/* Form Section (Right side) */}
//           <div className="w-full md:w-1/2 p-8 order-1 md:order-2">
//             <h2 className="text-3xl font-bold text-[#497174] mb-6">
//               Create an Account
//             </h2>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div className="space-y-2">
//                 <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//                 {message && <div className="mb-4 text-red-500">{message}</div>}
//                 <label
//                   htmlFor="name"
//                   className="block text-[#497174] font-medium"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
//                   placeholder="Enter your full name"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="block text-[#497174] font-medium"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="password"
//                   className="block text-[#497174] font-medium"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   className="mr-2 h-4 w-4 accent-[#EB6440]"
//                   required
//                 />
//                 <label htmlFor="terms" className="text-[#497174]">
//                   I agree to the Terms and Conditions
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-[#EB6440] text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 shadow-md"
//               >
//                 Create Account
//               </button>

//               <p className="text-center text-[#497174]">
//                 Already have an account?{" "}
//                 <a
//                   href="#"
//                   className="text-[#EB6440] font-medium hover:underline"
//                 >
//                   Sign In
//                 </a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;


// import { useState } from "react";
// import Navbar from "../navbar/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
// const[role,setRole]=useState("")
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Sending data:", { username, email, password,role });

//       const response = await axios.post(
//         "http://localhost:5000/api/users/register",
//         { username, email, password,role }
//       );

//       console.log("Response:", response.data);

//       setMessage(response.data.message);
//       if (response.data.message === "User registered successfully") {
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage(
//         error.response
//           ? error.response.data.message
//           : "Registration failed. Please try again."
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-[#EFF5F5] p-4">
//         <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Image Section */}
//           <div className="w-full md:w-1/2 relative h-64 md:h-auto order-2 md:order-1">
//             <img
//               src="https://via.placeholder.com/600x400" // استبدل الرابط بصورة صالحة
//               alt="Registration"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </div>

//           {/* Form Section */}
//           <div className="w-full md:w-1/2 p-8 order-1 md:order-2">
//             <h2 className="text-3xl font-bold text-[#497174] mb-6">
//               Create an Account
//             </h2>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div className="space-y-2">
//                 <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//                 {message && (
//                   <div
//                     className={`mb-4 ${
//                       message.includes("successfully")
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {message}
//                   </div>
//                 )}

//                 <label
//                   htmlFor="name"
//                   className="block text-[#497174] font-medium"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
//                   placeholder="Enter your full name"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="block text-[#497174] font-medium"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="password"
//                   className="block text-[#497174] font-medium"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   className="mr-2 h-4 w-4 accent-[#EB6440]"
//                   required
//                 />
//                 <label htmlFor="terms" className="text-[#497174]">
//                   I agree to the Terms and Conditions
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-[#EB6440] text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 shadow-md"
//               >
//                 Create Account
//               </button>

//               <p className="text-center text-[#497174]">
//                 Already have an account?{" "}
//                 <a
//                   href="#"
//                   className="text-[#EB6440] font-medium hover:underline"
//                 >
//                   Sign In
//                 </a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", { username, email, password, role });

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { username, email, password, role }
      );

      console.log("Response:", response.data);

      setMessage(response.data.message);
      if (response.data.message === "User registered successfully") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(
        error.response
          ? error.response.data.message
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#EFF5F5] p-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto order-2 md:order-1">
            <img
              src="https://www.sqorebda3.com/vb/attachments/16229/" // استبدل الرابط بصورة صالحة
              alt="Registration"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-[#497174] mb-6">
              Create an Account
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {message && (
                  <div
                    className={`mb-4 ${
                      message.includes("successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <label
                  htmlFor="name"
                  className="block text-[#497174] font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[#497174] font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[#497174] font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-[#497174] font-medium"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="publisher">Publisher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2 h-4 w-4 accent-[#EB6440]"
                  required
                />
                <label htmlFor="terms" className="text-[#497174]">
                  I agree to the Terms and Conditions
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#EB6440] text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 shadow-md"
              >
                Create Account
              </button>

              <p className="text-center text-[#497174]">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-[#EB6440] font-medium hover:underline"
                >
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;