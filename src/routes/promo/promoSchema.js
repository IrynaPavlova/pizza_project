const mongoose = require("mongoose");
const { Schema } = mongoose;

const promoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;
