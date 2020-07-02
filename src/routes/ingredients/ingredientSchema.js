const mongoose = require("mongoose");
const { Schema } = mongoose;

const ingredientSchema = new Schema(
  {
    name: {
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
    }
  },
  {
    timestamps: true
  }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
