const express = require('express');
const app = express();
app.use(express.json());
const { default: mongoose } = require('mongoose');

const cors = require('cors');
app.use(cors());

const MONGO_URI = "mongodb+srv://argha:argha@cluster0.6g2lwo5.mongodb.net/?retryWrites=true&w=majority"

app.get("/", (req, res) => {
    return res.json("Welcome to songdb")
})

// api route
const userRoute = require("./routes/route");
app.use("/api/", userRoute);

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", (error) => {
        console.log(`ERROR : ${error}`)
    })

app.listen(8080, () => console.log("Listening on port 8080"));