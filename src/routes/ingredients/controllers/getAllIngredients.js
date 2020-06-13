const Ingredient = require("../ingredientSchema");
//const getToken = require("../../../helpers/getToken");

const getAllingredients = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const allIngredients = await Ingredient.find();

    response.status(200).json({
      status: "success",
      ingredients: allIngredients
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "no ingredients"
    });
  }
};

module.exports = getAllingredients;
