const sgMail = require("@sendgrid/mail");
const config = require("../../../config");

const createTest = async (request, response) => {
  try {
    const user = request.body;
    const name = user.name;
    const email = user.email;

    sgMail.setApiKey(config.sendgrid);

    const msg = {
      to: "cto@appsidedev.com",
      from: "pavlovairafed@gmail.com",
      subject: "New user",
      html: `name: ${name}, email: ${email}`
    };
    await sgMail.send(msg);

    response.status(201).json({
      status: "success",
      user: user
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = createTest;
