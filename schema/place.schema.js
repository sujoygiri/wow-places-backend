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
        max:[30,'Must be at least 30, got {VALUE}'],
        required:[true,'Name is required']
    },
    placeDescription:{
        type:String,
        min:[5,'Must be at least 5, got {VALUE}'],
        max:[500,'Must be at least 500, got {VALUE}'],
        required:[true,'Description is required']
    },
    tags:{
        type:[String],
        required:true
    }
})

const placeModel = mongoose.model('Places',placeSchema,'Places')

module.exports = placeModel