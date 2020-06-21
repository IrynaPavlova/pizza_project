const jwt = require("jsonwebtoken");
const User = require("../../users/userSchema");
const getToken = require("../../../helpers/getToken");

const authCurrent = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "error",
        text: {
          ru: "Вы не аутентифицированы",
          eng: "You are not authenticated",
          ukr: "Ви не автентифіковані"
        }
      });
    }
    const userData = jwt.decode(token);
    const user = await User.findById(userData.id || userData.userId);

    response.status(200).json({ status: "success", user: user });
  } catch (error) {
    response.status(404).json({
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

module.exports = authCurrent;
