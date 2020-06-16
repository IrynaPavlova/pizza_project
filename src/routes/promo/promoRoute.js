const { Router } = require("express");
const getAllPromo = require("./controllers/getAllPromo");
const createPromo = require("./controllers/createPromo");
const deletePromo = require("./controllers/deletePromo");

const promoRoute = Router();

promoRoute.get("/", getAllPromo);
promoRoute.post("/", createPromo);
promoRoute.delete("/:id", deletePromo);

module.exports = promoRoute;
