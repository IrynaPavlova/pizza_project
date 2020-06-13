const Product = require("../productSchema");
//const getToken = require("../../../helpers/getToken");

const getAllProducts = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const allProducts = await Product.find().populate("ingredients");
    response.status(200).json({
      status: "success",
      products: allProducts
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "no products"
    });
  }
};

module.exports = getAllProducts;
