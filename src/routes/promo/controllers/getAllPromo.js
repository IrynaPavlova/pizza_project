const Promo = require("../promoSchema");

const getAllPromo = async (request, response) => {
  try {
    const allPromo = await Promo.find();

    response.status(200).json({
      status: "success",
      promo: allPromo
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "no promo"
    });
  }
};

module.exports = getAllPromo;
