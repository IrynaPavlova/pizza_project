const mongoose = require("mongoose");
const { Schema } = mongoose;
const Ingredient = require("../ingredients/ingredientSchema");

const productSchema = new Schema(
  {
    sku: {
      type: Number
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Object,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    creatorId: {
      type: Number
    },
    categories: {
      type: String,
      required: true
    },
    subcategory: {
      type: String
    },
    likes: {
      type: Number
    },
    images: {
      type: String
    },
    closeUpImages: {
      type: String
    },

    ingredients: [{ type: mongoose.Types.ObjectId, ref: "Ingredient" }]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
