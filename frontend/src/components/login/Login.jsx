
// import Navbar from "../navbar/Navbar";
// import React, { useState } from "react";
// import axios from "axios";
//       <Navbar />
// const Login = () => {
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [message, setMessage] = useState("");


//    const handleSubmit = async (e) => {
//      e.preventDefault();
//      try {
//        const response = await axios.post(
//          "http://localhost:5000/api/users/login",
//          {
//            email,
//            password,
//          },
//          {
//            withCredentials: true, // لضمان إرسال الكوكيز
//          }
//        );
//        setMessage(response.data.message); // سيتم عرض رسالة النجاح
//      } catch (error) {
//        setMessage(error.response.data.message); // سيتم عرض رسالة الخطأ
//      }
//    };



//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-[#EFF5F5] p-4">
//         <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Image Section - Full Size (Left side to match registration) */}
//           <div className="w-full md:w-1/2 relative h-64 md:h-auto order-2 md:order-1">
//             <img
//               src="https://www.cairo24.com/Upload/libfiles/79/4/943.jpg"
//               alt="Login"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </div>

//           {/* Form Section (Right side to match registration) */}
//           <div className="w-full md:w-1/2 p-8 order-1 md:order-2">
//             <h2 className="text-3xl font-bold text-[#497174] mb-6">
//               Welcome Back
//             </h2>
//             <form className="space-y-6" onSubmit={handleSubmit}>
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

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     className="mr-2 h-4 w-4 accent-[#EB6440]"
//                   />
//                   <label htmlFor="remember" className="text-[#497174]">
//                     Remember me
//                   </label>
//                 </div>
//                 <a
//                   href="#"
//                   className="text-[#EB6440] font-medium hover:underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-[#EB6440] text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 shadow-md"
//               >
//                 Sign In
//               </button>

//               <p className="text-center text-[#497174]">
//                 Don't have an account?{" "}
//                 <a
//                   href="#"
//                   className="text-[#EB6440] font-medium hover:underline"
//                 >
//                   Create Account
//                 </a>
//               </p>
//             </form>
//             {message && (
//               <p className="mt-4 text-center text-sm font-medium text-gray-800">
//                 {message}
//               </p>
//             )}{" "}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import Navbar from "../navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // لضمان إرسال الكوكيز
        }
      );
      setMessage(response.data.message); // عرض رسالة النجاح

      // إذا كان الرد ناجحًا، انتقل إلى صفحة الهوم
      if (response.status === 200) {
        navigate("/"); // تغيير "/home" إلى المسار الخاص بصفحة الهوم
      }
    } catch (error) {
      setMessage(error.response.data.message); // عرض رسالة الخطأ
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#EFF5F5] p-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section - Full Size (Left side to match registration) */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto order-2 md:order-1">
            <img
              src="https://www.cairo24.com/Upload/libfiles/79/4/943.jpg"
              alt="Login"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Form Section (Right side to match registration) */}
          <div className="w-full md:w-1/2 p-8 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-[#497174] mb-6">
              Welcome Back
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 h-4 w-4 accent-[#EB6440]"
                  />
                  <label htmlFor="remember" className="text-[#497174]">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-[#EB6440] font-medium hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#EB6440] text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 shadow-md"
              >
                Sign In
              </button>

              <p className="text-center text-[#497174]">
                Don't have an account?{" "}
                <Link to="/Register">
                  <a
                    href="#"
                    className="text-[#EB6440] font-medium hover:underline"
                  >
                    Create Account
                  </a>
                </Link>
              </p>
            </form>
            {message && (
              <p className="mt-4 text-center text-sm font-medium text-gray-800">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;