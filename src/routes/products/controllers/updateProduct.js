const Product = require("../productSchema");
//const getToken = require("../../../helpers/getToken");
const Joi = require("joi");

const categories = ["pizza", "drinks", "sides", "desserts"];
const subcategories = ["classic", "premium", "branded", ""];

const validation = Joi.object().keys({
  sku: Joi.number(),
  name: Joi.object({
    ru: Joi.string()
      .min(3)
      .required(),
    en: Joi.string()
      .min(3)
      .required(),
    ukr: Joi.string()
      .min(3)
      .required()
  }).required(),
  description: Joi.number(),
  //price: Joi.object().required(),
  price: Joi.alternatives().try(
    {
      M: Joi.number()
        .min(10)
        .required(),
      L: Joi.number()
        .min(10)
        .required(),
      XL: Joi.number()
        .min(10)
        .required()
    },
    {
      price: Joi.number()
        .min(10)
        .required()
    }
  ),
  currency: Joi.string(),
  categories: Joi.string()
    .valid(...categories)
    .required(),
  subcategory: Joi.string().valid(...subcategories),
  likes: Joi.number(),
  images: Joi.string().required(),
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
