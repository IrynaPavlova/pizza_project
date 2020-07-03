const mongoose = require("mongoose");
const { Schema } = mongoose;
const Ingredient = require("../ingredients/ingredientSchema");

const productSchema = new Schema(
  {
    sku: {
      type: Number
    },
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
    },
    description: {
      type: Number
    },
    price: {
      type: Object,
      required: true
    },
    // price: {
    //   M: {
    //     type: Number
    //   },
    //   L: {
    //     type: Number
    //   },
    //   XL: {
    //     type: Number
    //   },
    //   price: {
    //     type: Number
    //   }
    // },
    currency: {
      type: String
    },
    categories: {
      type: String,
      required: true,
      enum: ["pizza", "drinks", "sides", "desserts"]
    },
    subcategory: {
      type: String,
      enum: ["classic", "premium", "branded", ""]
    },
    likes: {
      type: Number
    },
    images: {
      type: String,
      required: true
    },

    ingredients: [{ type: mongoose.Types.ObjectId, ref: "Ingredient" }]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
