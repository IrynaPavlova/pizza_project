require("dotenv").config();
//console.log("process.env", process.env);

//set NODE_ENV=dev &&

const PORT = process.env.PORT || 3001;

module.exports = {
  port: PORT,
  mongodbUrl: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  oAuthGoogle: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: `http://localhost:${PORT}/auth/google/callback`
  },
  oAuthFacebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: `http://localhost:${PORT}/auth/facebook/callback`
  }
};
