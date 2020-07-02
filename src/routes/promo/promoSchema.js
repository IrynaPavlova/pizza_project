const mongoose = require("mongoose");
const { Schema } = mongoose;

const promoSchema = new Schema(
  {
    title: {
      ru: {
        type: String,
        required: true
      },
      en: {
        type: String,
        required: true
      },
      ukr: {
        type: String,
        required: true
      }
    },
    description: {
      ru: {
        type: String,
        required: true
      },
      en: {
        type: String,
        required: true
      },
      ukr: {
        type: String,
        required: true
      }
    },
    images: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;
