const Order = require("../orderSchema");
//const getToken = require("../../../helpers/getToken");

const getAllOrders = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const allOrders = await Order.find();
    //.populate("products");
    response.status(200).json({
      status: "success",
      orders: allOrders
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "no orders"
    });
  }
};

module.exports = getAllOrders;
