require("dotenv").config();

const PORT = process.env.PORT || 3000;

module.exports = {
  port: PORT,
  mongodbUrl: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  sendgrid: process.env.SENDGRID_API_KEY,
  baseUrl: "https://evening-caverns-34846.herokuapp.com",
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
