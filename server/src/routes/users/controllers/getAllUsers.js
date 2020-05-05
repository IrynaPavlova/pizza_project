const User = require("../userSchema");
const getToken = require("../../../helpers/getToken");

const getAllUsers = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const allUsers = await User.find();
    response.status(200).json({
      status: "success",
      users: allUsers
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "no users"
    });
  }
};

module.exports = getAllUsers;
