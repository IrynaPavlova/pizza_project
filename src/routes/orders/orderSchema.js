const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    creator: {
      type: String,
      required: true
    },
    productsList: {
      type: [
        {
          product: {
            type: String,
            required: true
          },
          type: {
            type: String,
            enum: ["M", "XL", "XXL"]
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
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
