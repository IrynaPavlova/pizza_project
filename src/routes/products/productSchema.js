const mongoose = require("mongoose");
const { Schema } = mongoose;
const Ingredient = require("../ingredients/ingredientSchema");

const productSchema = new Schema(
  {
    sku: {
      type: Number ///не нужно!!!
    },
    name: {
      type: Object,
      required: true
    },
    description: {
      ///не нужно!!!
      type: String
    },
    price: {
      type: Object,
      required: true
    },
    currency: {
      type: String /// не нужно!!!
    },
    categories: {
      type: String,
      required: true
    },
    subcategory: {
      type: String ////только для пиццы!!!!!!
    },
    likes: {
      type: Number ///не нужно!!!!
    },
    images: {
      type: String ///не нужно!!!!
    },

    ingredients: [{ type: mongoose.Types.ObjectId, ref: "Ingredient" }] ///для пиццы!!!!!
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
