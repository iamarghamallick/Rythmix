const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        required: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("song", SongSchema)