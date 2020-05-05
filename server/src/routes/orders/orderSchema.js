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
            required: true,
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
    deliveryType: {
      type: String,
      required: true,
      enum: ["delivery", "office"]
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    sumToPay: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ["inProgress", "declined", "finished", "failed"]
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
