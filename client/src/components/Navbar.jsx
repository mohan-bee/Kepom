import { Group, Home, Music, Plus, Search, User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className="md:hidden flex justify-around w-full mb-5 bg-gray-800 py-4 rounded-xl">
               <p className="bg-gray-700 text-white p-3 rounded-full border cursor-pointer" onClick={() =>  navigate('/')}><Home /></p>
               {/* <p className="bg-gray-700 text-white p-3 rounded-full border cursor-pointer" onClick={() => navigate('/add-playlist')}><Plus /></p> */}
               <p className="bg-gray-700 text-white p-3 rounded-full border cursor-pointer" onClick={() => navigate('/add-music')}><Music /></p>
               <p className="bg-gray-700 text-white p-3 rounded-full border cursor-pointer" onClick={() => navigate('/rooms')}><Group /></p>
               <p className="bg-gray-700 text-white p-3 rounded-full border cursor-pointer" onClick={() => navigate('/profile')}><User /></p>
             </div>
  )
}
 
export default Navbar