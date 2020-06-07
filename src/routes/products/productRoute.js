const { Router } = require("express");
const getAllProducts = require("./controllers/getAllProducts");
const getProductById = require("./controllers/getProductById");
const getProductByCategory = require("./controllers/getProductByCategory");
const getProductByIds = require("./controllers/getProductsByIds");
const createProduct = require("./controllers/createProduct");
const updateProduct = require("./controllers/updateProduct");
const deleteProduct = require("./controllers/deleteProduct");

const productRoute = Router();

productRoute.get("/", (request, response) => {
  const requestQuery = Object.keys(request.query)[0];

  request.url === "/" && getAllProducts(request, response);
  requestQuery === "ids" && getProductByIds(request, response);
  requestQuery === "category" && getProductByCategory(request, response);
});

productRoute.get("/:id", getProductById);
productRoute.post("/", createProduct);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

module.exports = productRoute;
