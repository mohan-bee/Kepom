import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search } from 'lucide-react';

const roomsData = [
  { id: 1, name: 'Tech Talk', host: 'Alice', members: 12 },
  { id: 2, name: 'Gaming Hub', host: 'Bob', members: 20 },
  { id: 3, name: 'Music Lovers', host: 'Charlie', members: 15 },
];

const RoomsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-neutral text-neutral-content">
      <div className='w-full h-full  backdrop-blur-sm absolute z-10'></div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full p-6">
        <div className='z-20'>
        <Navbar />
        </div>

        {/* Page Title */}
        <div className="p-6">
          <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-6 text-white">Browse Rooms</h1>
          <button className='btn btn-primary'>Create Room</button>
          </div>
         
                    <div className="relative my-5">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search />
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search Room..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
          {/* Rooms Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomsData.map((room) => (
              <div
                key={room.id}
                onClick={() => navigate(`/room`)}
                className="bg-gray-800 p-5 rounded-lg shadow-md flex justify-between items-center cursor-pointer 
                           hover:bg-gray-700 transition duration-300"
              >
                {/* Room Info */}
                <div>
                  <h2 className="text-xl font-semibold text-white">{room.name}</h2>
                  <p className="text-gray-400">Host: {room.host}</p>
                </div>

                {/* Members Count */}
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {room.members} Members
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
