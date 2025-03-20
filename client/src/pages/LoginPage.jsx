import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google/callback`, "_self")
  }
  return (
    <div className="flex flex-col md:flex-row justify-between md:py-0 py-80 items-center h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2 flex-col">
        <h2 className="  text-xl font-semibold text-white my-9">Sign in to <p className='text-6xl text-primary'>Kepom</p></h2>
        <button className="btn bg-white text-black border-[#e5e5e5]  flex items-center gap-2 p-2 rounded-lg shadow-md" onClick={handleLogin}>
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
      <div className="hidden md:flex md:w-1/2 h-full px-5 items-center justify-center border-l-2 border-gray-700">
        <img
          className="object-cover "
          src="https://cdn.prod.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298f612b93c55_631576ebbd94c7cc86308308_DrawKit0018_Music_Banner.png"
          alt="Music Banner"
        />
      </div>
    </div>
  );
};

export default LoginPage;