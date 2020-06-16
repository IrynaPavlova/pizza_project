const { Router } = require("express");
const changeStatus = require("./controllers/changeStatus");

const statusRoute = Router();

statusRoute.post("/:id", changeStatus);

module.exports = statusRoute;
