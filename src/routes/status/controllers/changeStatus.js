const Order = require("../../orders/orderSchema");

const changeStatus = async (request, response) => {
  try {
    const id = request.params.id;

    const doneOrder = await Order.findOneAndUpdate(
      { _id: id },
      { status: "done" },
      { new: true }
    );
    response.status(201).json({
      status: "success",
      doneOrder: doneOrder
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "status was not changed"
    });
  }
};

module.exports = changeStatus;
