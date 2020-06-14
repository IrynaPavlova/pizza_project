const generateToken = require("../../../helpers/generateToken");

const authGoogle = async (req, res) => {
  try {
    const user = req.user;
    const userName = user.username;
    const userId = user._id;
    const payload = { userId };
    const token = generateToken(payload);

    return (
      res
        .status(201)
        ///.setHeader("Set-Cookie")
        // .json({
        //   username: userName,
        //   token: token
        // })
        .redirect(`http://localhost:3000/auth/?token=${token}&name=${userName}`)
    );
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: error.message,
      text: "user was not authenticated"
    });
  }
};
module.exports = authGoogle;
