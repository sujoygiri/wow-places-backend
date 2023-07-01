const express = require("express");
const placeControllerObj = require("../controller/place.controller");

const placeRouter = express.Router()


placeRouter.get('/get-place',placeControllerObj.getPlace)




module.exports = placeRouter