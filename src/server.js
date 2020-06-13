//const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const corsMiddleware = require("cors");
const passport = require("passport");
const passportStrategies = require("./routes/auth/passportStrategies");
const verifyToken = require("./helpers/verifyToken");
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/products/productRoute");
const userRoute = require("./routes/users/userRoute");
const orderRoute = require("./routes/orders/orderRoute");
const imageRoute = require("./routes/images/imageRoute");
const commentsRoute = require("./routes/comments/commentRoute");
const ingredientRoute = require("./routes/ingredients/ingredientRoute");
const { mongodbUrl } = require("../config");
const app = express();

const errorHandler = (error, request, response, next) => {
  response.status(500).send("Error:" + error.stack);
};

const startServer = port => {
  passportStrategies.initGoogleOAuthStrategy();
  passportStrategies.initFacebookOAuthStrategy();
  app
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(express.json())
    .use(express.static("static"))
    .use(corsMiddleware())
    //.use(morgan("combined"))
    //.use(verifyToken)
    .use("/auth", authRoute)
    .use("/products", productRoute)
    .use("/users", userRoute)
    .use("/orders", orderRoute)
    .use("/images", imageRoute)
    .use("/comments", commentsRoute)
    .use("/ingredients", ingredientRoute)
    .use(errorHandler);

  mongoose.connect(
    mongodbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
    err => {
      if (err) return console.log(err);
      app.listen(port, error => {
        if (error) {
          return console.log("Something bad happened", error);
        }
        console.log("Server listening on port", port);
      });
    }
  );
};

module.exports = startServer;

{
  /* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */
}
