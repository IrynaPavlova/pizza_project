const Order = require("../orderSchema");
const User = require("../../users/userSchema");
//const getToken = require("../../../helpers/getToken");

const createOrder = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const newOrder = new Order(request.body);
    const order = await newOrder.save();

    // const user = await User.findById(order.creator);
    // const userOrders = user.orders;
    // userOrders.push(order);

    // await User.findOneAndUpdate(
    //   { _id: order.creator },
    //   { orders: userOrders },
    //   { new: true }
    // );

    response.status(201).json({ status: "success", order });
  } catch (err) {
    response.status(404).json({ status: "error", message: err.message });
  }
};

module.exports = createOrder;
