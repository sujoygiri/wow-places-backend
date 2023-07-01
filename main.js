require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

const placeRouter = require("./routes/addPlace.route");

const PORT = 3000 || process.env.PORT;
const HOST = 'localhost';

const server = express();

server.use(cors({ origin: 'http://localhost:4200', credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@wowplaces.qpqx1cz.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })
// server.post('/file',multer({storage}).single('placeImage'),(req,res,next)=>{
//     res.json({msg:"Send"})
//     console.log(req.body)
//     console.log(req.file)
// })

server.use('/place', placeRouter);

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
