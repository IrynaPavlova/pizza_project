require("dotenv").config();

const PORT = process.env.PORT || 3001;

module.exports = {
  port: PORT,
  mongodbUrl: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  oAuthGoogle: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL:
      //`http://localhost:${PORT}/auth/google/callback`
      "https://evening-caverns-34846.herokuapp.com/auth/google/callback"
  },
  oAuthFacebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL:
      //`http://localhost:${PORT}/auth/facebook/callback`
      "https://evening-caverns-34846.herokuapp.com/auth/facebook/callback"
  }
};
