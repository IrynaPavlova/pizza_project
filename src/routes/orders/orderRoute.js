const { Router } = require("express");
const createOrder = require("./controllers/createOrder");
const getOrderById = require("./controllers/getOrderById");
const getAllOrders = require("./controllers/getAllOrders");
const updateOrder = require("./controllers/updateOrder");
const deleteOrder = require("./controllers/deleteOrder");

const orderRoute = Router();

orderRoute.post("/", createOrder);
orderRoute.get("/:id", getOrderById);
orderRoute.get("/", getAllOrders);
orderRoute.put("/:id", updateOrder);
orderRoute.delete("/:id", deleteOrder);

module.exports = orderRoute;
