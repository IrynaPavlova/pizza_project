const User = require("../../users/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../../../helpers/generateToken");
const config = require("../../../../config");
const sgMail = require("@sendgrid/mail");
const shortid = require("shortid");

const authRegister = async (request, response) => {
  try {
    const user = request.body;
    const email = user.email;
    const name = user.username;
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

    //const verificationToken = shortid();

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const userData = {
      ...user,
      //verificationToken: verificationToken,
      password: hashedPassword
    };

    const newUser = new User(userData);
    const userToSave = await newUser.save();
    const id = userToSave._id;
    const payload = { id };
    const token = generateToken(payload);

    //const verificationLink = `${config.baseUrl}/auth/verify/${verificationToken}`;
    // const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;

    // sgMail.setApiKey(config.sendgrid);

    // const msg = {
    //   to: email,
    //   from: "pavlovairafed@gmail.com",
    //   subject: "Please confirm your email",
    //   html: `Hello, ${name}! To confirm your email address: ${email} click the <a href="${verificationLink}">link</a>`
    // };
    // await sgMail.send(msg);

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
