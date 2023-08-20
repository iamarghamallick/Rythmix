const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname;
        return cb(null, uniqueFileName);
    }
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("uploadpage");
});

app.post('/upload', upload.single('song'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
});

const filesDirectory = path.join(__dirname, 'uploads');
app.get('/uploads/:filename', (req, res) => {
    const requestedFilename = req.params.filename;
    const filePath = path.join(filesDirectory, requestedFilename);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(PORT, () => { console.log(`Upload server started on port ${PORT}`) });