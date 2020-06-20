const mongoose = require("mongoose");
const { Schema } = mongoose;
//const Product = require("../products/productSchema");

const orderSchema = new Schema(
  {
    creator: {
      type: String,
      required: true
    },
    productsList: {
      type: [
        {
          // product: {
          //   type: Object
          // },
          productName: {
            type: Object,
            required: true
          },

          type: {
            type: String,
            enum: ["M", "L", "XL"]
          },
          itemsCount: {
            type: Number,
            required: true
          }
        }
      ],
      required: true
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    sumToPay: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
