import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({playlist}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/playlists/${playlist._id}`)} className="card bg-base-200 shadow-xl p-3 cursor-pointer" data-theme="white">
      <figure>
        <img 
          src={playlist.coverImg}
          alt="Playlist" 
          className="rounded-md" 
        />
      </figure>
      <div className="p-3">
        <h3 className="font-semibold">{playlist.title}</h3>
        <p className="text-sm text-neutral-content">{playlist.author}</p>
      </div>
    </div>
  );
};

export default Card;
