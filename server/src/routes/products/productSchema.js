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
      type: Number,
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
      type: Array
    },
    likes: {
      type: Number,
      required: true
    },
    images: {
      type: Array,
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
