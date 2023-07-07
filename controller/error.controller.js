const errorControllerObj = {}

errorControllerObj.errorHandler = (req, res, next) => {
    res.status(500).json({ success: 0, errors: 'Nothing found' });
    next();
}

module.exports = errorControllerObj;