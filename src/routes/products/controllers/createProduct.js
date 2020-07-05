const Product = require("../productSchema");

const Joi = require("joi");

const validation = Joi.alternatives().try(
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
);

const createProduct = async (request, response) => {
  try {
    const price = request.body.price;
    const validPrice = Joi.validate(price, validation);
    if (validPrice.error) {
      return response.status(400).json(validPrice.error.message);
    }
    const product = request.body;

    const newProduct = new Product(product);
    const productToSave = await newProduct.save();

    response.status(201).json({
      status: "success",
      product: productToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "product was not saved"
    });
  }
};

module.exports = createProduct;
