const Promo = require("../promoSchema");

const getPromoById = async (request, response) => {
  try {
    const id = request.params.id;
    const findPromo = await Promo.findById(id);
    response.status(200).json({
      status: "success",
      promo: findPromo
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "promo was not found"
    });
  }
};
module.exports = getPromoById;
