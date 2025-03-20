import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProfilePage = ({ user }) => {
  const logout = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, "_self");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-grow items-center p-4 w-full">
        <Navbar />
        
        <div className="flex flex-col items-center justify-center w-full px-8 py-20 mt-10">
          <div className="bg-black bg-opacity-40 rounded-2xl shadow-lg max-w-lg w-full text-center p-10">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-blue-500 shadow-md">
                <img src={user && user.picture} alt="Profile" className="object-cover w-full h-full rounded-full" />
              </div>
            </div>


            <h2 className="text-3xl font-bold mt-6">{user?.name}</h2>
            <p className="text-gray-400 mt-1">{user?.email}</p>


            <div className="mt-6 space-y-4">
              <button onClick={() => alert("Under Construction")} className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-full shadow-md transition duration-300">
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full shadow-md transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
