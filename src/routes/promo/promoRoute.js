const { Router } = require("express");
const getAllPromo = require("./controllers/getAllPromo");
const createPromo = require("./controllers/createPromo");
const deletePromo = require("./controllers/deletePromo");
const updatePromo = require("./controllers/updatePromo");

const promoRoute = Router();

promoRoute.get("/", getAllPromo);
promoRoute.post("/", createPromo);
promoRoute.delete("/:id", deletePromo);
promoRoute.put("/:id", updatePromo);

module.exports = promoRoute;
