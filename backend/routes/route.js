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
        const data = await song.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data' });
    }
});

router.put('/updatesong/:id', async (req, res) => {
    try {
        const documentId = req.params.id;
        const newData = req.body;
        const updatedData = await song.findByIdAndUpdate(documentId, newData, { new: true });

        if (!updatedData) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ error: 'Error updating data' });
    }
});

const newSongData = async (req, res) => {
    const newSong = new song({
        title: req.body.title,
        artist: req.body.artist,
        audioUrl: req.body.audioUrl,
        likeCount: 0
    })
    try {
        const savedSong = await newSong.save();
        res.status(200).send({ song: savedSong })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

module.exports = router