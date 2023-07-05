const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
    placeImage:{
        type:String,
        unique:true,
        required:true
    },
    placeName:{
        type:String,
        min:[2,'Must be at least 2, got {VALUE}'],
        max:[100,'Must be at max 100, got {VALUE}'],
        required:[true,'Name is required']
    },
    placeDescription:{
        type:String,
        min:[5,'Must be at least 5, got {VALUE}'],
        max:[500,'Must be at max 500, got {VALUE}'],
        required:[true,'Description is required']
    },
    placeTags:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const placeModel = mongoose.model('Places',placeSchema,'Places')

module.exports = placeModel