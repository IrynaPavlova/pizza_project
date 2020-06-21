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
        text: {
          ru: "Некорректный адрес электронной почты или пароль",
          eng: "Invalid email or password",
          ukr: "Некоректна адреса електронної пошти або пароль"
        }
      });
    }

    const payload = { password, id };

    const token = generateToken(payload);
    response.status(200).json({ status: "success", user: user, token: token });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: {
        ru: "Что-то пошло не так. Попоробуйте еще раз",
        eng: "Something went wrong. Try again",
        ukr: "Щось пішло не так. Спробуйте ще раз."
      }
    });
  }
};
module.exports = authLogin;
