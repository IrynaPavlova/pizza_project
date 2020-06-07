const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    file: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
