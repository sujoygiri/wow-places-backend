const express = require("express");
const multer = require("multer");

const placeControllerObj = require("../controller/place.controller");

const placeRouter = express.Router()

placeRouter.get('/get-place',placeControllerObj.getPlace)

placeRouter.post('/add-place',multer({storage:placeControllerObj.imageStorage(),fileFilter:placeControllerObj.imageFilter,limits:{fileSize:5242880}}).single('placeImage'),placeControllerObj.addPlaceValidationChain(),placeControllerObj.addPlace)


module.exports = placeRouter