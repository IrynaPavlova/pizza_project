const { Router } = require("express");
const getUserById = require("./controllers/getUserById");
const updateUser = require("./controllers/updateUser");
const getAllUsers = require("./controllers/getAllUsers");
const deleteUser = require("./controllers/deleteUser");

const userRoute = Router();

userRoute.get("/:id", getUserById);
userRoute.get("/", getAllUsers);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

module.exports = userRoute;
