const generateToken = require("../../../helpers/generateToken");

const authFacebook = async (req, res) => {
  try {
    const user = req.user;
    const userName = user.username;
    const userId = user._id;
    const email = user.email;
    const payload = { userId };
    const token = generateToken(payload);

    return res.status(201).redirect(
      `http://localhost:3000/auth/?token=${token}&name=${userName}&email=${email}&id=${userId}`
      //`https://quizzical-goldstine-2423c6.netlify.app/auth/?token=${token}&name=${userName}&email=${email}`
    );
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not authenticated"
    });
  }
};
module.exports = authFacebook;
