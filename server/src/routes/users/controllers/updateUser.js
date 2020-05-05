const User = require("../userSchema");
const bcrypt = require("bcrypt");
const getToken = require("../../../helpers/getToken");

const updateUser = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const user = request.body;
    const id = request.params.id;

    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
      new: true
    });
    response.status(201).json({
      status: "success",
      user: updatedUser
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such user"
    });
  }
};

module.exports = updateUser;
