const jwt = require("jsonwebtoken");
const User = require("../../users/userSchema");
const getToken = require("../../../helpers/getToken");

const authCurrent = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const userData = jwt.decode(token);
    const user = await User.findById(userData.id);

    response.status(200).json({ status: "success", user: user });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not found"
    });
  }
};

module.exports = authCurrent;
