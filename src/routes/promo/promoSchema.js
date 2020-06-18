const mongoose = require("mongoose");
const { Schema } = mongoose;

const promoSchema = new Schema(
  {
    title: {
      type: Object,
      required: true
    },
    description: {
      type: Object,
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
