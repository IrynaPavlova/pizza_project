const jwt = require("jsonwebtoken");
const User = require("../../users/userSchema");

const authVerify = async (request, response) => {
  try {
    const { verificationToken } = request.params;
    console.log("verificationToken", verificationToken);
    if (!verificationToken) {
      return response.status(403).send({
        status: "error",
        text: {
          ru: "Вы не аутентифицированы",
          en: "You are not authenticated",
          ukr: "Ви не автентифіковані"
        }
      });
    }
    const userToVerify = await User.findOne({ verificationToken });

    if (!userToVerify) {
      return response.status(403).send({
        status: "error",
        text: {
          ru: "Пользователь не найден",
          en: "User is not found",
          ukr: "Користувач не знайдений"
        }
      });
    }

    await User.findOneAndUpdate(
      { verificationToken },
      { $set: { verificationToken: null, status: "ACTIVE" } }
    );

    return response.status(200).send({
      status: "success",
      text: {
        ru: "Пользователь верифицирован",
        en: "User successfully verified",
        ukr: "Користувач верифікований"
      }
    });
  } catch (error) {
    response.status(404).json({
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

module.exports = authVerify;
