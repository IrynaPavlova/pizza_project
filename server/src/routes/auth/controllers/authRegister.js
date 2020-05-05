const User = require("../../users/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../../../helpers/generateToken");

const authRegister = async (request, response) => {
  try {
    const user = request.body;
    const email = user.email;
    const emailMatch = await User.findOne({ email });

    if (emailMatch) {
      return response.status(404).json({
        status: "error",
        text: "user already exists"
      });
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const userData = { ...user, password: hashedPassword };

    const newUser = new User(userData);
    const userToSave = await newUser.save();
    const id = userToSave._id;
    const payload = { id };
    const token = generateToken(payload);

    response.status(201).json({
      status: "success",
      user: userToSave,
      token: token
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "user was not saved"
    });
  }
};

module.exports = authRegister;
