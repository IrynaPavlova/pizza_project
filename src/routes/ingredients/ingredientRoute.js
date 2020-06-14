const { Router } = require("express");
const getAllIngredients = require("./controllers/getAllIngredients");
const createIngredient = require("./controllers/createIngredient");
const deleteIngredient = require("./controllers/deleteIngredient");

const ingredientRoute = Router();

ingredientRoute.get("/", getAllIngredients);
ingredientRoute.post("/", createIngredient);
ingredientRoute.delete("/:id", deleteIngredient);

module.exports = ingredientRoute;
