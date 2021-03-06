const generateToken = require("../../../helpers/generateToken");

const authFacebook = async (req, res) => {
  try {
    const user = req.user;
    //console.log("user", user);
    const userName = user.username;
    const userId = user._id;
    const email = user.email;
    const payload = { userId };
    const token = generateToken(payload);

    return (
      res
        .status(201)
        //.send({ userId, token, userName, email });

        .redirect(
          //`http://localhost:3000/auth/?token=${token}&name=${userName}&email=${email}&id=${userId}`
          `https://goit-team-project.netlify.app/auth/?token=${token}&name=${userName}&email=${email}&id=${userId}`
        )
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
