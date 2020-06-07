const generateToken = require("../../../helpers/generateToken");

const authFacebook = async (req, res) => {
  try {
    const user = req.user;
    const userName = user.username;
    const userId = user._id;
    const payload = { userId };
    const token = generateToken(payload);

    return res.status(201).json({
      username: userName,
      token: token
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not authenticated"
    });
  }
};
module.exports = authFacebook;