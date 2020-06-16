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
    const order = { ...request.body, status: "new" };
    const newOrder = new Order(order);
    const orderToSave = await newOrder.save();

    const user = await User.findById(order.creator);
    const userOrders = user.orders;
    userOrders.push(orderToSave);

    await User.findOneAndUpdate(
      { _id: order.creator },
      { orders: userOrders },
      { new: true }
    );

    response.status(201).json({
      status: "success",
      newOrder: orderToSave
    });
  } catch (err) {
    response.status(404).json({ status: "error", message: err.message });
  }
};

module.exports = createOrder;
