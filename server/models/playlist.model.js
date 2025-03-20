const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    music: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
