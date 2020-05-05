const Order = require("../orderSchema");
const getToken = require("../../../helpers/getToken");

const deleteOrder = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const id = request.params.id;

    const orderToDelete = await Order.findById(id);
    await orderToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedOder: orderToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "order was not deleted"
    });
  }
};

module.exports = deleteOrder;
