const Promo = require("../promoSchema");

const updatePromo = async (request, response) => {
  try {
    const promo = request.body;
    const id = request.params.id;

    const updatedPromo = await Promo.findOneAndUpdate({ _id: id }, promo, {
      new: true
    });
    response.status(201).json({
      status: "success",
      updatedPromo: updatedPromo
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "there is no such promo"
    });
  }
};

module.exports = updatePromo;
