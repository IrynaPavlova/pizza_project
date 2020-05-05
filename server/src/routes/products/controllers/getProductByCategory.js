const Product = require("../productSchema");
const getToken = require("../../../helpers/getToken");

const getProductByCategory = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const stringCategory = Object.values(request.query)[0];
    const category = stringCategory.slice(1, stringCategory.length - 1);

    const products = await Product.find({
      categories: { $in: category }
    }).populate("ingredients");
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

module.exports = getProductByCategory;
