const bcrypt = require("bcrypt");
const User = require("../../users/userSchema");
const generateToken = require("../../../helpers/generateToken");

const passwordMatch = (password, hash) => bcrypt.compareSync(password, hash);

const authLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    const id = user._id;

    const correctPassword = passwordMatch(password, user.password);

    if (!user || !correctPassword) {
      response.status(404).json({
        status: "error",
        message: error.message,
        text: "user was not authenticated"
      });
    }

    const payload = { password, id };

    const token = generateToken(payload);
    response.status(200).json({ status: "success", user: user, token: token });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not authenticated"
    });
  }
};
module.exports = authLogin;
