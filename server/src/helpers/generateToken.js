const jwt = require("jsonwebtoken");
const { secret } = require("../../config");

const generateToken = paramsForToken => {
  return jwt.sign(paramsForToken, secret, {
    expiresIn: "30d"
  });
};

module.exports = generateToken;
