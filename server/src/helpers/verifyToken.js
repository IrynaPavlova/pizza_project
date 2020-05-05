const jwt = require("jsonwebtoken");
const { secret } = require("../../config");
const getToken = require("../helpers/getToken");

const verifyToken = (request, response, next) => {
  if (request.url === "/auth/login" || request.url === "/auth/register") {
    next();
    return;
  }

  const token = getToken(request);
  const secretKey = secret;

  if (!token) {
    return response.status(403).send({
      status: "failed",
      message: "No token provided"
    });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return response.json({
        status: "failed",
        message: "Failed to authenticate token"
      });
    }

    request.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
