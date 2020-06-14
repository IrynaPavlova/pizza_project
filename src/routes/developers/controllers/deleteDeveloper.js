const Developer = require("../developerSchema");

const deleteDeveloper = async (request, response) => {
  try {
    const id = request.params.id;

    const devToDelete = await Developer.findById(id);
    await devToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedDeveloper: devToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "developer was not deleted"
    });
  }
};

module.exports = deleteDeveloper;
