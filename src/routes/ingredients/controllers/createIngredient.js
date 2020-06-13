const Ingredient = require("../ingredientSchema");
//const getToken = require("../../../helpers/getToken");

const createIngredient = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const ingredient = request.body;

    const newIngredient = new Ingredient(ingredient);
    const ingredientToSave = await newIngredient.save();

    response.status(201).json({
      status: "success",
      ingredient: ingredientToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "ingredient was not saved"
    });
  }
};

module.exports = createIngredient;
