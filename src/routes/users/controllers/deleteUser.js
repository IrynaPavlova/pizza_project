const User = require("../userSchema");
const getToken = require("../../../helpers/getToken");

const deleteUser = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const id = request.params.id;

    const userToDelete = await User.findById(id);
    await userToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedUser: userToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not deleted"
    });
  }
};

module.exports = deleteUser;
