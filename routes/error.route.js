const express = require("express");

const errorControllerObj = require("../controller/error.controller");

const errorRouter = express.Router()

errorRouter.use(errorControllerObj.errorHandler)

module.exports = errorRouter