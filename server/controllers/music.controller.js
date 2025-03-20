const Music = require("../models/music.model")


const getAllMusic = async (req,res) => {
    try {
        const music = await Music.find();
        if(!music){
            return res.status(404).json({success: false, message: "Failed to Get All Music"})
        }
        return res.status(200).json({success: true, message: "Music Found Successfully", music})
    } catch (error) {
        return res.status(404).json({success: false, message: "Error in getAllMusic()", desc: error.message})
    }
}

const addMusic = async (req,res) => {
    try {
        const {title,artist, album, genre, releaseYear, coverUrl, musicUrl} = req.body
        const newMusic = new Music({title,artist, album, genre, releaseYear, coverUrl, musicUrl})
        await newMusic.save()
        return res.status(200).json({success: true, message: "Music Created Successfully", newMusic})
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({success: false, message: "Error in addMusic()", desc: error.message})
    }
}

const getMusicById = async (req,res) => {
    try {
        const id = req.params.id
        const music = await Music.findById(id);
        if(!music){
            return res.status(404).json({success: false, message: "Failed to Get  Music"})
        }
        return res.status(200).json({success: true, message: "Music Found Successfully", music})
    } catch (error) {
        return res.status(404).json({success: false, message: "Error in getAllMusic()", desc: error.message})
    }
}
module.exports = {getAllMusic, addMusic, getMusicById}