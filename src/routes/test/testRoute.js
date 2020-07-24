const { Router } = require("express");
const createTest = require("./createTest");

const testRoute = Router();

testRoute.post("/", createTest);

module.exports = testRoute;
