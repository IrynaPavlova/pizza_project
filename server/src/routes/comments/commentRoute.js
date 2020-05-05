const { Router } = require("express");
const createComment = require("./controllers/createComment");
const getComment = require("./controllers/getComment");

const commentRoute = Router();

commentRoute.get("/", (request, response) => {
  const requestQuery = Object.keys(request.query)[0];

  requestQuery === "productId" && getComment(request, response);
});
commentRoute.post("/", createComment);

module.exports = commentRoute;
