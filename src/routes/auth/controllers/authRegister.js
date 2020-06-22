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
        text: {
          ru: "Адрес электронной почты уже занят",
          en: "Email already exists",
          ukr: "Адреса електронної пошти вже зайнята"
        }
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
      text: {
        ru: "Что-то пошло не так. Попоробуйте еще раз",
        en: "Something went wrong. Try again",
        ukr: "Щось пішло не так. Спробуйте ще раз."
      }
    });
  }
};

module.exports = authRegister;
