require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const placeRouter = require("./routes/addPlace.route");
const errorRouter = require("./routes/error.route");
const requestLogger = require("./util/requestLogger");
const errorLogger = require("./util/errorLogger");

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

const server = express();

server.use(cors({ origin: 'http://localhost:4200', credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

let DB_URL = 'mongodb://127.0.0.1:27017/';
if(process.env.NODE_ENV === 'production'){
    DB_URL = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@wowplaces.qpqx1cz.mongodb.net/?retryWrites=true&w=majority`;
}

mongoose.connect(DB_URL,{dbName:'wowplace',useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

server.use(requestLogger)

server.use('/place', placeRouter);
server.use('*',errorRouter);

server.use(errorLogger);

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
