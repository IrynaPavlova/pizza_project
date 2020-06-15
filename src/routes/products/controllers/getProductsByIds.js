const Product = require("../productSchema");
const getToken = require("../../../helpers/getToken");

const getProductByIds = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const stringIds = Object.values(request.query)[0];
    const ids = stringIds.slice(1, stringIds.length - 1).split(",");

    const products = await Product.find({ _id: { $in: ids } }).populate(
      "ingredients"
    );
    response.status(200).json({
      status: "success",
      products: products
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "no products"
    });
  }
};

module.exports = getProductByIds;
