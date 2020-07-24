//const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const corsMiddleware = require("cors");
const passport = require("passport");
const passportStrategies = require("./routes/auth/passportStrategies");
//const verifyToken = require("./helpers/verifyToken");
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/products/productRoute");
const userRoute = require("./routes/users/userRoute");
const orderRoute = require("./routes/orders/orderRoute");
const imageRoute = require("./routes/images/imageRoute");
const imageSliderRoute = require("./routes/images/imageSliderRoute");
const commentsRoute = require("./routes/comments/commentRoute");
const ingredientRoute = require("./routes/ingredients/ingredientRoute");
const developerRoute = require("./routes/developers/developerRoute");
const promoRoute = require("./routes/promo/promoRoute");
const statusRoute = require("./routes/status/statusRoute");
const testRoute = require("./routes/test/testRoute");
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
    .use("/images-slider", imageSliderRoute)
    .use("/comments", commentsRoute)
    .use("/ingredients", ingredientRoute)
    .use("/developers", developerRoute)
    .use("/promo", promoRoute)
    .use("/status", statusRoute)
    .use("/test", testRoute)
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
