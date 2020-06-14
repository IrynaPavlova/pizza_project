const Developer = require("../developerSchema");

const getAllDevelopers = async (request, response) => {
  try {
    const allDevelopers = await Developer.find();

    response.status(200).json({
      status: "success",
      developers: allDevelopers
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "no developers"
    });
  }
};

module.exports = getAllDevelopers;
