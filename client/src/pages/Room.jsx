import React from 'react';
import { Play, SkipForward, SkipBack } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const currentSong = {
  title: 'Chill Vibes',
  artist: 'DJ Relax',
  cover: 'https://assets.audiomack.com/priya-/81c44b65dcde983731cf43e19b4f259e460c58f2e2640eac7ba300a375370e39.jpeg'
};

const queue = [
  { id: 1, title: 'Lo-Fi Beats', artist: 'Artist One' },
  { id: 2, title: 'Smooth Jazz', artist: 'Artist Two' },
  { id: 3, title: 'Indie Chill', artist: 'Artist Three' }
];

const RoomPage = () => {
  return (
    <div className="min-h-screen flex bg-neutral text-neutral-content">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <Navbar />

        {/* Room Content */}
        <div className="flex flex-col items-center p-6">
          {/* Room Name */}
          <h2 className="text-4xl font-bold mt-6 mb-8">Room Name</h2>

          {/* Current Song Section */}
          <div className="flex flex-col items-center text-center">
            <img 
              className="w-52 h-52 object-cover rounded-xl shadow-lg mb-4" 
              src={currentSong.cover} 
              alt="Current Song" 
            />
            <h1 className="text-3xl font-bold">{currentSong.title}</h1>
            <p className="text-gray-400 text-lg">{currentSong.artist}</p>

            {/* Music Controls */}
            <div className="flex items-center gap-6 mt-6">
              <SkipBack className="w-10 h-10 text-gray-400 cursor-pointer hover:text-white transition" />
              <div className="w-14 h-14 bg-blue-500 flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition">
                <Play className="w-8 h-8 text-white" />
              </div>
              <SkipForward className="w-10 h-10 text-gray-400 cursor-pointer hover:text-white transition" />
            </div>
          </div>

          {/* Queue Section */}
          <div className="mt-10 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">Queue</h2>
            
            <div className="space-y-3">
              {queue.map((song) => (
                <div 
                  key={song.id} 
                  className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
                >
                  {/* Song Info */}
                  <div>
                    <p className="text-lg font-medium">{song.title}</p>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>

                  {/* Play Button */}
                  <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-600 transition">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomPage;
