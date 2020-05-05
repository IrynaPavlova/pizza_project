const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    telephone: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    images: {
      type: Array
    },
    favoriteProducts: {
      type: Array
    },
    viewedProducts: {
      type: Array
    },
    orders: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
