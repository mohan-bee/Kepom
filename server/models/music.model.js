const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String },
    releaseYear: { type: Number },
    coverUrl: {type: String},
    musicUrl: {type: String},
    likes: { type: Number, default: 0 },
    plays: { type: Number, default: 0 },
    addedAt: { type: Date, default: Date.now }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;