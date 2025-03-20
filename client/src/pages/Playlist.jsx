import { Heart, Play, User, MoreVertical, Pause } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Playlist = ({ isPlaying, currentSong, setCurrentSong, setNextSong }) => {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [fillHeart, setFillHeart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlaylistAndSongs = async () => {
      try {
        const playlistRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/playlist/${id}`);
        const playlistData = playlistRes.data.playlist;
        setPlaylist(playlistData);

        if (playlistData?.music.length > 0) {
          const songRequests = playlistData.music.map((songId) =>
            axios.get(`${import.meta.env.VITE_API_URL}/api/music/${songId}`)
          );
          const songResponses = await Promise.all(songRequests);
          setSongs(songResponses.map(res => res.data.music));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPlaylistAndSongs();
  }, [id]);

  useEffect(() => {
    if (currentSong && songs.length > 0) {
      const currentSongIndex = songs.findIndex(song => song._id === currentSong._id);
      if (currentSongIndex !== -1) {
        const next = songs[(currentSongIndex + 1) % songs.length];
        setNextSong(next);
      }
    }
  }, [currentSong, songs, setNextSong]);

  const handlePlayClick = (song) => {
    setCurrentSong(song);
    const nextIndex = (songs.findIndex(s => s._id === song._id) + 1) % songs.length;
    setNextSong(songs[nextIndex]);
  };

  if (!playlist) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row items-center gap-5 p-5">
          <figure className="w-44 h-44 flex justify-center items-center">
            <img
              className="object-cover rounded-lg w-full h-full"
              src={playlist.coverImg}
              alt="Playlist Cover"
            />
          </figure>
          <div className="content text-center md:text-left">
            <p className="text-sm text-gray-400 uppercase">Playlist</p>
            <h1 className="text-4xl font-bold">{playlist.title}</h1>
            <strong className="flex items-center gap-2 my-4">
              <User /> {playlist.author}
            </strong>
            <div className="flex items-center gap-4 mt-3">
              {isPlaying ? (
                <Pause className="bg-blue-500 w-10 h-10 p-2 rounded-full cursor-pointer" />
              ) : (
                <Play
                  className="bg-blue-500 w-10 h-10 p-2 rounded-full cursor-pointer"
                  onClick={() => handlePlayClick(songs[0])}
                />
              )}
              <MoreVertical
                className="bg-gray-700 cursor-pointer w-10 h-10 p-2 rounded-full"
                onClick={() => alert("Under Construction")}
              />
            </div>
          </div>
        </div>

        {/* Songs List */}
        <ol className="mt-5 p-6 mb-20">
          {songs.map((song) => (
            <li
              key={song._id}
              className="flex justify-between items-center gap-5 px-5 py-3 bg-gray-800 rounded-lg mb-2"
            >
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handlePlayClick(song)}>
                <figure className="w-16 h-16 sm:w-14 sm:h-14 md:w-20 md:h-20">
                  <img
                    className="object-cover rounded-lg w-full h-full"
                    src={song.coverUrl}
                    alt="Song Thumbnail"
                  />
                </figure>
                <div className="flex flex-col">
                  <p className="text-base sm:text-sm md:text-lg font-medium">{song.title}</p>
                  <p className="text-sm sm:text-xs md:text-base text-gray-400">{song.artist}</p>
                </div>
              </div>
              {isPlaying && currentSong?._id === song._id ? (
                <Pause className="bg-blue-500 w-10 h-10 p-2 rounded-full cursor-pointer" />
              ) : (
                <Play
                  className="bg-blue-500 w-10 h-10 p-2 rounded-full cursor-pointer"
                  onClick={() => handlePlayClick(song)}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Playlist;
