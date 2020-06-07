const Order = require("../orderSchema");
const getToken = require("../../../helpers/getToken");

const updateOrder = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const order = request.body;
    const id = request.params.id;

    const updatedOrder = await Order.findOneAndUpdate({ _id: id }, order, {
      new: true
    });
    response.status(201).json({
      status: "success",
      order: updatedOrder
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such order"
    });
  }
};

module.exports = updateOrder;
