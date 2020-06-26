const Product = require("../productSchema");
const getToken = require("../../../helpers/getToken");
const Joi = require("joi");

const categories = ["pizza", "drinks", "sides", "desserts"];
const subcategories = ["classic", "premium", "branded", ""];

const validation = Joi.object().keys({
  sku: Joi.number(),
  name: Joi.object().required(),
  description: Joi.string(),
  price: Joi.object().required(),
  currency: Joi.string(),
  categories: Joi.string()
    .valid(...categories)
    .required(),
  subcategory: Joi.string().valid(...subcategories),
  likes: Joi.number(),
  images: Joi.string(),
  ingredients: Joi.array()
});

const updateProduct = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const product = Joi.validate(request.body, validation);
    if (product.error) {
      return response.status(400).json(product.error.details[0].message);
    }

    const id = request.params.id;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      product.value,
      { new: true }
    );

    response.status(201).json({
      status: "success",
      product: updatedProduct
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such product"
    });
  }
};

module.exports = updateProduct;
