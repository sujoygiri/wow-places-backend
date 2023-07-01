const placeModel = require('../schema/place.schema')

const placeControllerObj = {}

placeControllerObj.getPlace = async (req,res,next)=>{
    // try {
    //     const place = await placeModel.find({},{__v:0,_id:0,limit:1})
    //     res.json(place)
    // } catch (error) {
    //     next(error)
    // }
    res.json({msg:process.env.DB_USER_NAME})
}


module.exports = placeControllerObj