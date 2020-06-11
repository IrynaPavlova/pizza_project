const getToken = require("../../../helpers/getToken");

const authLogout = async (request, response) => {
  try {
    let token = getToken(request);
    if (token) {
      token = null;
      response
        .status(200)
        .send({ status: "success", text: "Logout success", token: token });
    } else
      response.status(403).send({
        status: "error",
        text: "No token provided"
      });
  } catch (error) {
    response.status(400).send({
      status: "error",
      message: error.message,
      text: "User was not logout"
    });
  }
};

module.exports = authLogout;
