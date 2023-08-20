const router = require("express").Router();
const multer = require('multer');
const song = require('../models/song');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname;
        cb(null, uniqueFileName);
    }
})
const upload = multer({ storage: storage });

const filesDirectory = path.join(__dirname, '../uploads');
router.get('/uploads/:filename', (req, res) => {
    const requestedFilename = req.params.filename;
    const filePath = path.join(filesDirectory, requestedFilename);

    if (fs.existsSync(filePath)) {
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

router.post("/addsong", upload.single('song'), async (req, res) => {
    const newSong = new song({
        title: req.body.title,
        artist: req.body.artist,
        filePath: req.file.filename,
        likeCount: 0
    })
    try {
        const savedSong = await newSong.save();
        console.log("New Song Added!");
        res.status(200).send({ song: savedSong });
    } catch (error) {
        res.status(500).send({ message: error })
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

module.exports = router