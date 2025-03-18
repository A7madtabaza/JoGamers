import React, { useState, useEffect } from "react";
import { User, Mail, Edit2, X, Camera, Gamepad2, Bell, Plus } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios"; // استيراد axios للتواصل مع الخادوم

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newGamerTag, setNewGamerTag] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // جلب بيانات المستخدم من الخادوم باستخدام JWT من الكوكيز
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true, // إرسال الكوكيز مع الطلب
        });
        const user = response.data;
        setNewUsername(user.username);
        setNewEmail(user.email);
        setNewPhone(user.phoneNumber || ""); // إذا كان لديك حقل phoneNumber في النموذج
        setNewGamerTag(user.gamerTag || ""); // إذا كان لديك حقل gamerTag في النموذج
        setProfileImageUrl(user.profileImage || ""); // إذا كان لديك حقل profileImage في النموذج
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // تحويل الصورة إلى base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // حفظ التغييرات
  const handleSaveChanges = async () => {
    try {
      let imageBase64 = profileImageUrl;
      if (newProfileImage) {
        imageBase64 = await convertImageToBase64(newProfileImage);
        setProfileImageUrl(imageBase64);
      }

      const updatedUser = {
        username: newUsername,
        email: newEmail,
        phoneNumber: newPhone,
        gamerTag: newGamerTag,
        profileImage: imageBase64,
      };

      // تحديث البيانات في الخادوم
      const response = await axios.put("http://localhost:5000/api/user/profile", updatedUser, {
        withCredentials: true, // إرسال الكوكيز مع الطلب
      });

      Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        icon: "success",
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update profile.",
        icon: "error",
      });
      console.error("Update Error:", error);
    }
  };

  if (!newUsername) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EFF5F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EB6440] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container my-20 mx-auto px-4 bg-[#EFF5F5]">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="w-full bg-gradient-to-r from-[#497174] via-[#5a868a] to-[#D6E4E5] rounded-2xl shadow-xl mb-10 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-[#497174] opacity-10" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                 }} 
            />
            <div className="relative py-8 px-6 md:px-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Profile Image Section */}
                <div className="relative mb-6 md:mb-0">
                  <div className="relative w-32 h-32 group">
                    <img
                      src={profileImageUrl || "/api/placeholder/128/128"}
                      alt="Gamer Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-xl transform group-hover:scale-105 transition-all duration-300"
                    />
                    <div
                      className="absolute -right-2 -bottom-2 bg-[#EB6440] p-2 rounded-full shadow-lg cursor-pointer hover:bg-[#d55835] transition-all duration-200"
                      onClick={() => setIsEditing(true)}
                    >
                      <Camera className="text-white" size={20} />
                    </div>
                  </div>
                </div>

                {/* User Info Section */}
                <div className="flex-grow px-8 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {newUsername}
                  </h2>
                  <p className="text-white opacity-90 text-lg mb-2">{newEmail}</p>
                  <p className="text-white bg-[#EB6440] inline-block px-3 py-1 rounded-full font-medium">
                    <Gamepad2 className="inline mr-1" size={16} /> 
                    {newGamerTag || "GamerTag"}
                  </p>
                </div>

                {/* Edit Button Section */}
                <div className="mt-6 md:mt-0">
                  <button
                    className="bg-[#EB6440] text-white hover:bg-[#d55835] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="mr-2" size={20} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-fadeIn">
            <div className="bg-[#497174] rounded-t-2xl p-6 relative">
              <h5 className="text-white text-2xl font-bold text-center">Edit Gamer Profile</h5>
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute right-4 top-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gamer Tag</label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={newGamerTag}
                  onChange={(e) => setNewGamerTag(e.target.value)}
                  placeholder="Enter your gamer tag"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input
                  type="file"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  onChange={(e) => setNewProfileImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="p-6 bg-[#EFF5F5] rounded-b-2xl flex justify-end space-x-4">
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all duration-300 flex items-center cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                <X className="mr-2" size={18} />
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-[#EB6440] hover:bg-[#d55835] text-white font-medium transition-all duration-300 flex items-center cursor-pointer"
                onClick={handleSaveChanges}
              >
                <Edit2 className="mr-2" size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;