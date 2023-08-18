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
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("song", SongSchema)