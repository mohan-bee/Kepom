import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import axios from "axios";

const HomePage = (userDetails) => {
  const user = userDetails.user;
  const [playlists, setPlaylists] = useState([])

  console.log(user)
  const getPlaylist = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/playlist/all`)
      setPlaylists(res.data.playlists)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getPlaylist()
  }, [])
  console.log("Playlist ",playlists)
  return (
    <div className="min-h-screen bg-neutral text-neutral-content flex">
      {/* Sidebar */}
        <Sidebar />      

      {/* Main Content */}
      <div className="flex-1 p-6">
       <Navbar />
        <h2 className="text-3xl font-bold mb-4">Playlists</h2>
        
        {/* Playlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
           <Card key={playlist._id} playlist={playlist}/>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
