import { Image, Music } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

const AddMusic = () => {
  const [musicData, setMusicData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseYear: '',
  });
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [musicUrl, setMusicUrl] = useState('');

  const handleChange = (e) => {
    setMusicData({ ...musicData, [e.target.name]: e.target.value });
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kepom-dir'); 

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dycx19qo7/${type}/upload`,
        formData
      );
      setUploading(false);
      return response.data.secure_url; 
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cover || !file) {
      alert('Please select both a cover image and a music file!');
      return;
    }

    // Upload cover image
    const uploadedCoverUrl = await uploadToCloudinary(cover, 'image');
    if (uploadedCoverUrl) setCoverUrl(uploadedCoverUrl);

    // Upload music file
    const uploadedMusicUrl = await uploadToCloudinary(file, 'video'); // Use "video" for audio uploads
    if (uploadedMusicUrl) setMusicUrl(uploadedMusicUrl);

    // Log or send data to backend
    // {title,artist, album, genre, releaseYear, coverUrl, musicUrl}
    let res = await axios.post(`${import.meta.env.VITE_API_URL}/api/music/add`, { ...musicData,coverUrl:uploadedCoverUrl, musicUrl:uploadedMusicUrl})
    console.log(res.data)
    console.log({
      ...musicData,
      coverUrl: uploadedCoverUrl,
      musicUrl: uploadedMusicUrl,
    });

    alert('Upload successful!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Add Music</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-3">
            <label className="label text-base-content">Title</label>
            <input
              type="text"
              name="title"
              value={musicData.title}
              onChange={handleChange}
              className="input w-full border-none focus:ring-0 focus:border-transparent"
              required
            />
          </div>
          <div className="form-control mb-3">
            <label className="label text-base-content">Artist</label>
            <input
              type="text"
              name="artist"
              value={musicData.artist}
              onChange={handleChange}
              className="input w-full border-none focus:ring-0 focus:border-transparent"
              required
            />
          </div>
          <div className="form-control mb-3">
            <label className="label text-base-content">Album</label>
            <input
              type="text"
              name="album"
              value={musicData.album}
              onChange={handleChange}
              className="input w-full border-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="form-control mb-3">
            <label className="label text-base-content">Genre</label>
            <input
              type="text"
              name="genre"
              value={musicData.genre}
              onChange={handleChange}
              className="input w-full border-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="form-control mb-3">
            <label className="label text-base-content">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={musicData.releaseYear}
              onChange={handleChange}
              className="input w-full border-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 my-2 mt-2">
            {/* Upload Cover */}
            <div className="form-control mb-3">
              <label className="text-blue-700 cursor-pointer" onClick={() => document.getElementById('coverInput').click()}>
                {cover ? <img src={URL.createObjectURL(cover)} alt="Cover Preview" className="w-10 h-10 rounded" /> : <Image size={26} />}
              </label>
              <input id="coverInput" type="file" accept="image/*" onChange={handleCoverChange} className="hidden" required />
            </div>
            {/* Upload Music */}
            <div className="form-control mb-3">
              <label className="label text-blue-700 cursor-pointer" onClick={() => document.getElementById('musicFileInput').click()}>
                {file ? <Music size={26} color="green" className="text-green-500" /> : <Music size={26} />}
              </label>
              <input id="musicFileInput" type="file" accept="audio/*" onChange={handleFileChange} className="hidden" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary bg-blue-500 w-full" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
          {/* Display uploaded links */}
          {coverUrl && (
            <p className="text-sm mt-2 text-center">
              Cover Uploaded: <a href={coverUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
            </p>
          )}
          {musicUrl && (
            <p className="text-sm mt-2 text-center">
              Music Uploaded: <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">Listen</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddMusic;
