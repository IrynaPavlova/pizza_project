const User = require("../userSchema");
const getToken = require("../../../helpers/getToken");

const getUserById = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const id = request.params.id;
    const findUser = await User.findById(id);
    response.status(200).json({
      status: "success",
      user: findUser
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "user was not found"
    });
  }
};

module.exports = getUserById;
