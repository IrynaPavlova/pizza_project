const startServer = require("./src/server");
const { port } = require("./config");
//require("dotenv").config();

startServer(port);
