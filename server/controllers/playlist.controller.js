const Playlist = require('../models/playlist.model');

const createPlaylist = async (req, res) => {
    try {
        const { title, coverImg, author, music } = req.body;

        if (!title || !coverImg || !author || !music.length) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newPlaylist = new Playlist({ title, coverImg, author, music });
        await newPlaylist.save();

        return res.status(201).json({ success: true, message: "Playlist Created Successfully", playlist: newPlaylist });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in createPlaylist()", desc: error.message });
    }
};

const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find().populate("music");
        
        if (!playlists.length) {
            return res.status(404).json({ success: false, message: "No playlists found" });
        }

        return res.status(200).json({ success: true, message: "Playlists retrieved successfully", playlists });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in getPlaylists()", desc: error.message });
    }
};

const getPlaylistById = async (req,res) => {
    try {
        id = req.params.id
        const playlist = await Playlist.findById(id)
        if(!playlist) return res.status(404).json({success: false, message: "Playlist Not Found"})
        return res.status(200).json({success: true, message: "Playlist Found !", playlist})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in getPlaylists()", desc: error.message });
    }
}
module.exports = { createPlaylist, getPlaylists, getPlaylistById };
