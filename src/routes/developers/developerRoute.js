const { Router } = require("express");
const getAllDevelopers = require("./controllers/getAllDevelopers");
const createDeveloper = require("./controllers/createDeveloper");
const deleteDeveloper = require("./controllers/deleteDeveloper");

const developerRoute = Router();

developerRoute.get("/", getAllDevelopers);
developerRoute.post("/", createDeveloper);
developerRoute.delete("/:id", deleteDeveloper);

module.exports = developerRoute;
