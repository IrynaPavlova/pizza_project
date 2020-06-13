const { Router } = require("express");
const getAllIngredients = require("./controllers/getAllIngredients");
const createIngredient = require("./controllers/createIngredient");

const ingredientRoute = Router();

ingredientRoute.get("/", getAllIngredients);
ingredientRoute.post("/", createIngredient);

module.exports = ingredientRoute;
