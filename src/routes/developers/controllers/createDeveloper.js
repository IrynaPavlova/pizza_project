const Developer = require("../developerSchema");

const createDeveloper = async (request, response) => {
  try {
    const developer = request.body;

    const newDeveloper = new Developer(developer);
    const developerToSave = await newDeveloper.save();

    response.status(201).json({
      status: "success",
      developer: developerToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "developer was not saved"
    });
  }
};

module.exports = createDeveloper;
