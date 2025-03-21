import React from 'react';
import { Home, Search, Library, GroupIcon, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className="hidden w-64 bg-neutral-focus p-5 md:flex flex-col space-y-6 border-r border-r-slate-700">
      <p className="text-3xl ml-3 font-bold text-primary">Kepom</p>
      <ul className="space-y-2">
        <li onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer hover:text-primary hover:bg-slate-900 py-3 px-2 rounded-md">
          <Home size={24} /> <span className='text-md'>Home</span>
        </li>
        {/* <li onClick={() => navigate('/add-playlist')} className="flex items-center space-x-3 cursor-pointer hover:text-primary hover:bg-slate-900  py-3 px-2 rounded-md">
          <Plus size={24} /> <span className="text-md">Add Playlist</span>
        </li> */}
        <li onClick={() => navigate('/rooms')} className="flex items-center space-x-3 cursor-pointer hover:text-primary hover:bg-slate-900  py-3 px-2 rounded-md">
          <GroupIcon  size={24} /> <span className='text-md'>Rooms</span>
        </li>
        <li onClick={() => navigate('/profile')} className="flex items-center space-x-3 cursor-pointer hover:text-primary hover:bg-slate-900  py-3 px-2 rounded-md">
          <User  size={24} /> <span className='text-md'>Profile</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
