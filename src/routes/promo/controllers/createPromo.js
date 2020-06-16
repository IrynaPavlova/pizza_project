const Promo = require("../promoSchema");

const createPromo = async (request, response) => {
  try {
    const promo = request.body;

    const newPromo = new Promo(promo);
    const promoToSave = await newPromo.save();

    response.status(201).json({
      status: "success",
      newPromo: promoToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "promo was not saved"
    });
  }
};

module.exports = createPromo;
