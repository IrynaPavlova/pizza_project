const Product = require("../productSchema");
const getToken = require("../../../helpers/getToken");

const getProductById = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const id = request.params.id;
    const findProduct = await Product.findById(id).populate("ingredients");
    response.status(200).json({
      status: "success",
      product: findProduct
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "product was not found"
    });
  }
};

module.exports = getProductById;
