const path = require("node:path");
const fs = require("node:fs");
const multer = require("multer");
const crypto = require("node:crypto");
const { unescape } = require("node:querystring");

const { body, validationResult } = require("express-validator");

const placeModel = require('../schema/place.schema');

const placeControllerObj = {};
const fsPromises = fs.promises;

placeControllerObj.getPlace = async (req, res, next) => {
    try {
        const place = await placeModel.find({});
        res.json(place);
    } catch (err) {
        let error = new Error('No place found!')
        error.status = 404;
        next(error);
    }
};

placeControllerObj.imageStorage = () => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const imageFileName = crypto.randomBytes(10).toString('hex');
        const imageExtension = file.mimetype.split('/')[1];
        cb(null, imageFileName + '.' + imageExtension);
    }
});

placeControllerObj.imageFilter = async (req, file, cb) => {
    let fileType = file.mimetype.split('/')[1];
    if (fileType === 'jpeg' || fileType === 'png' || fileType === 'jpg') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Invalid image type!'));
    }
};

placeControllerObj.placeImage = () => body('placeImage').isBase64().withMessage('Invalid image type!');

placeControllerObj.placeNameValidationChain = () => body('placeName').notEmpty().withMessage('place name is required').trim().isString().escape().isLength({ min: 2, max: 30 }).withMessage('Place name must be between 2 and 30 characters long');

placeControllerObj.placeDescriptionValidationChain = () => body('placeDescription').notEmpty().withMessage('place description is required').trim().isString().escape().isLength({ min: 5, max: 500 }).withMessage('Place description must be between 5 and 500 characters long');

placeControllerObj.tagsValidationChain = () => body('tags').notEmpty().withMessage('place tags is required').isString().withMessage('place tags must be a string').trim().escape();

placeControllerObj.addPlaceValidationChain = () => [placeControllerObj.placeNameValidationChain(), placeControllerObj.placeDescriptionValidationChain(), placeControllerObj.tagsValidationChain()];

placeControllerObj.addPlace = async (req, res, next) => {
    const result = validationResult(req);
    const deleteImage = (imagePath) => {
        fs.unlink(imagePath, (err) => {
            if (err) {
                return next(err);
            }
        });
    };
    // console.log(fileContent);
    if (result.isEmpty()) {
        try {
            let supportedMagicCode = ['ffd8ffe0', 'ffd8ffe1', '89504e47'];
            let fileContent = await fsPromises.readFile(req.file.path, { encoding: 'hex' });
            let fileMagicCode = fileContent.substring(0, 8);
            if (supportedMagicCode.includes(fileMagicCode)) {
                let imagePath = path.join('images', 'uploads', req.file.filename);
                let placeDetails = {
                    placeImage: imagePath,
                    placeName: req.body.placeName,
                    placeDescription: req.body.placeDescription,
                    tags: unescape(req.body.tags)
                };
                let savedPlaceData = await placeModel.create(placeDetails);
                res.json({ savedPlaceData, success: 1 });
                next();
            } else {
                deleteImage(req.file.path);
                res.json({ success:0, errors: 'Image not supported!' });
                next();
            }
        } catch (error) {
            deleteImage(req.file.path);
            next(error);
        }
    } else {
        deleteImage(req.file.path);
        res.json({ success:0, errors: result.array()[0].msg });
        next();
    }
};

module.exports = placeControllerObj;