const { Router } = require("express");
const authLogin = require("./controllers/authLogin");
const authLogout = require("./controllers/authLogout");
const authCurrent = require("./controllers/authCurrent");
const authVerify = require("./controllers/authVerify");
const authRegister = require("./controllers/authRegister");
const authGoogle = require("./controllers/authGoogle");
const authFacebook = require("./controllers/authFacebook");
const passport = require("passport");

const authRoute = Router();

authRoute.post("/login", authLogin);
authRoute.post("/logout", authLogout);
authRoute.get("/current", authCurrent);
authRoute.post("/register", authRegister);
authRoute.get("/verify/:verificationToken", authVerify);
authRoute.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/plus.login"
    ]
  })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authGoogle
);

authRoute.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false
  })
);

authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  authFacebook
);

module.exports = authRoute;
