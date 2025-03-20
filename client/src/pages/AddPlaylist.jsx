import axios from "axios";
import { Delete, Image, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

const AddPlaylist = () => {
  const [music, setMusic] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [coverImg, setCoverImg] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const coverRef = useRef();

  const fetchAllMusic = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/music/all`);
      setMusic(res.data.music);
      setFilteredMusic(res.data.music);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllMusic();
  }, []);

  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kepom-dir");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dycx19qo7/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !coverImg || !author || selectedMusic.length === 0) {
      alert("All fields are required, including at least one song.");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadToCloudinary(coverImg);
      if (!uploadedImageUrl) {
        alert("Failed to upload cover image.");
        setLoading(false);
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/playlist/add`, {
        title,
        coverImg: uploadedImageUrl,
        author,
        music: selectedMusic.map((song) => song._id),
      });

      alert("Playlist created successfully!");
      setTitle("");
      setAuthor("");
      setCoverImg(null);
      setSelectedMusic([]);
    } catch (error) {
      console.log(error.message);
      alert("Error creating playlist.");
    } finally {
      setLoading(false);
    }
  };

  const addMusic = (e, song) => {
    e.preventDefault();
    if (!selectedMusic.some((m) => m._id === song._id)) {
      setSelectedMusic((prev) => [...prev, song]);
    } else {
      alert("Song already added.");
    }
  };

  const removeSelectedMusic = (id) => {
    setSelectedMusic(selectedMusic.filter((music) => music._id !== id));
  };

  const handleFileChange = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredMusic(music);
    } else {
      setFilteredMusic(
        music.filter((song) =>
          song.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-2 min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-2xl p-6 bg-base-300 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add Playlist</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Playlist Title" onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" required />
          <div>
            <label className="block">Cover Image</label>
            {coverImg && <img src={URL.createObjectURL(coverImg)} alt="cover" className="w-16 h-16 rounded-lg my-2" />}
            <button type="button" onClick={() => coverRef.current.click()} className="btn btn-secondary">
              Upload Image <Image className="ml-2" size={20} />
            </button>
            <input type="file" accept="image/*" onChange={handleFileChange} ref={coverRef} className="hidden" />
          </div>
          <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} className="input input-bordered w-full" required />
          <div>
            <Search size={20} className="absolute mt-3 ml-3" />
            <input type="search" placeholder="Search Songs..." onChange={(e) => handleSearch(e.target.value)} className="input input-bordered w-full pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedMusic.map(music => (
              <span key={music._id} className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center">
                {music.title} <Delete onClick={() => removeSelectedMusic(music._id)} className="ml-2 cursor-pointer" />
              </span>
            ))}
          </div>
          <div className="overflow-y-auto h-64 bg-gray-800 p-4 rounded-lg">
            {filteredMusic.map(song => (
              <div key={song._id} className="flex justify-between items-center p-2 bg-gray-900 rounded-lg mb-2">
                <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded" />
                <p className="flex-1 ml-3 truncate">{song.title}</p>
                <button onClick={(e) => addMusic(e, song)} className="btn btn-primary">Add</button>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Creating..." : "Add Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlaylist;
