const passport = require("passport");
const GoogleOAuthStrategy = require("passport-google-oauth2");
const FacebookOAuthStrategy = require("passport-facebook");
const config = require("../../../config");
const User = require("../users/userSchema");

const findOrCreateUserByEmail = async (email, username) => {
  return User.findOneAndUpdate(
    { email },
    { $setOnInsert: { username } },
    { upsert: true, new: true }
  );
};

// const findOrCreateUserById = async (id, username) => {
//   return User.findOneAndUpdate(
//     { id },
//     { $setOnInsert: { username } },
//     { upsert: true, new: true }
//   );

//   // return User.findOneAndUpdate(
//   //   { id },
//   //   { $setOnInsert: { username } },
//   //   { upsert: true, new: true }
//   // );
// };

class PassportStrategies {
  initGoogleOAuthStrategy() {
    passport.use(
      new GoogleOAuthStrategy(config.oAuthGoogle, async function(
        request,
        accessToken,
        refreshToken,
        profile,
        done
      ) {
        const user = await findOrCreateUserByEmail(
          profile.email,
          profile.displayName
        );
        done(null, user);
      })
    );
  }

  initFacebookOAuthStrategy() {
    passport.use(
      new FacebookOAuthStrategy(config.oAuthFacebook, async function(
        request,
        accessToken,
        refreshToken,
        profile,
        done
      ) {
        const user = await findOrCreateUserByEmail(
          profile.email,
          //profile.id,
          profile.displayName
        );
        console.log("profile", profile);
        done(null, user);
      })
    );
  }
}

module.exports = new PassportStrategies();
