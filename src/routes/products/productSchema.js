const mongoose = require("mongoose");
const { Schema } = mongoose;
const Ingredient = require("../ingredients/ingredientSchema");

const productSchema = new Schema(
  {
    sku: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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
      type: Number,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    subcategory: {
      type: String
    },
    likes: {
      type: Number,
      required: true
    },
    images: {
      type: Array
    },
    closeUpImages: {
      type: Array
    },

    ingredients: [{ type: mongoose.Types.ObjectId, ref: "Ingredient" }]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
