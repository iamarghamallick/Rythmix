const router = require("express").Router();
const song = require('../models/song');
const bodyParser = require('body-parser');

router.post("/addsong", async (req, res) => {
    try {
        newSongData(req, res);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

router.get('/getsong', async (req, res) => {
    try {
        const data = await song.find({}); // Retrieve all documents
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data' });
    }
});

const newSongData = async (req, res) => {
    const newSong = new song({
        title: req.body.title,
        artist: req.body.artist,
        audioUrl: req.body.audioUrl
        // title: "req.body.title",
        // artist: "req.body.artist",
        // audioUrl: "req.body.audioUrl"
    })
    try {
        const savedSong = await newSong.save();
        res.status(200).send({ song: savedSong })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

module.exports = router