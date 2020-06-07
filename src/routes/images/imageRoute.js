const { Router } = require("express");
const saveImage = require("./controllers/saveImage");
const agregateBodyWithImage = require("../../helpers/agregateBodyWithImage");

const imageRoute = Router();

imageRoute.post("/", agregateBodyWithImage, saveImage);

module.exports = imageRoute;
