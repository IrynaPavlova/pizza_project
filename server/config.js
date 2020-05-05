const PORT = 3001;

module.exports = {
  port: PORT,
  mongodbUrl:
    "mongodb+srv://pavlova:1234567890@cluster1-eqedw.mongodb.net/test?retryWrites=true&w=majority",
  secret: "secret",
  oAuthGoogle: {
    clientID:
      "628250067855-katmoq7raljb6emgnpfilr2tcbngo1mr.apps.googleusercontent.com",
    clientSecret: "2U6oiDqWThKl5-PoezXAX3wG",
    callbackURL: `http://localhost:${PORT}/auth/google/callback`
  },
  oAuthFacebook: {
    clientID: "1574205016090864",
    clientSecret: "5c6228a0be352114244831eb06cd3536",
    callbackURL: `http://localhost:${PORT}/auth/facebook/callback`
  }
};
