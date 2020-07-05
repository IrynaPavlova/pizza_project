const Product = require("../productSchema");

const Joi = require("joi");

const validationPrice = Joi.alternatives().try(
  {
    M: Joi.number()
      .min(10)
      .max(999)
      .required(),
    L: Joi.number()
      .min(10)
      .max(999)
      .required(),
    XL: Joi.number()
      .min(10)
      .max(999)
      .required()
  },
  {
    price: Joi.number()
      .min(10)
      .max(999)
      .required()
  }
);

const validationName = Joi.object({
  ru: Joi.string()
    .min(3)
    .max(30)
    .required(),
  en: Joi.string()
    .min(3)
    .max(30)
    .required(),
  ukr: Joi.string()
    .min(3)
    .max(30)
    .required()
}).required();

const validationDescription = Joi.number()
  .min(0.3)
  .max(999);

const createProduct = async (request, response) => {
  try {
    const name = request.body.name;
    const validName = Joi.validate(name, validationName);
    if (validName.error) {
      return response.status(400).json(validName.error.details[0].message);
    }

    const price = request.body.price;
    const validPrice = Joi.validate(price, validationPrice);
    if (validPrice.error) {
      return response.status(400).json(validPrice.error.details[0].message);
    }

    const description = request.body.description;
    if (description !== undefined) {
      const validDescription = Joi.validate(description, validationDescription);
      if (validDescription.error) {
        return response
          .status(400)
          .json(validDescription.error.details[0].message);
      }
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
