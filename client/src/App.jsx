import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './output.css';
import HomePage from './pages/HomePage';
import Playlist from './pages/Playlist';
import Player from './components/Player';
import RoomsPage from './pages/RoomsPage';
import RoomPage from './pages/Room';
import ProfilePage from './pages/ProfilePage';
import AddMusic from './pages/AddMusic';
import axios from 'axios';
import AddPlaylist from './pages/AddPlaylist';

const App = () => {
  const [user, setUser] = useState(["a"]);
  const [currentSong, setCurrentSong] = useState(null); // Track the current playing song
  const [nextSong, setNextSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false);

  const getUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/login/success`, { withCredentials: true });
        if (response.data?.user) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }
    } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
        setUser(null);
    }
};

useEffect(() => {
    getUser();
}, []);
console.log(user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/profile' element={ <ProfilePage user={user}/> } />
        <Route path='/add-music' element={ <AddMusic/> } />
        <Route path='/login' element={<HomePage />} />
        <Route path='/' element={<HomePage user={user}/> } />
        {/* <Route path='/profile' element={user ? <ProfilePage user={user}/> : <LoginPage />} />
        <Route path='/add-music' element={user ? <AddMusic/> : <LoginPage />} />
        <Route path='/login' element={user ? <HomePage /> : <LoginPage />} />
        <Route path='/' element={user ? <HomePage user={user}/> : <LoginPage />} /> */}
        <Route path='/playlists/:id'  element={<Playlist setNextSong={setNextSong} isPlaying={isPlaying}  currentSong={currentSong} setCurrentSong={setCurrentSong} />} />
        <Route path='/rooms'  element={<RoomsPage />} />
        <Route path='/room'  element={<RoomPage />} />
        <Route path='/add-playlist'  element={<AddPlaylist />} />
      </Routes>
      
     
     {currentSong && <Player setCurrentSong={setCurrentSong} nextSong={nextSong} song={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
     
    </BrowserRouter>
  );
};

export default App;
