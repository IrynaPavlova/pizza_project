const Ingredient = require("../ingredientSchema");

const deleteIngredient = async (request, response) => {
  try {
    const id = request.params.id;

    const ingToDelete = await Ingredient.findById(id);
    await ingToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedIngredient: ingToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "ingredient was not deleted"
    });
  }
};

module.exports = deleteIngredient;
