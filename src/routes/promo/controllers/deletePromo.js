const Promo = require("../promoSchema");

const deletePromo = async (request, response) => {
  try {
    const id = request.params.id;

    const promoToDelete = await Promo.findById(id);
    await promoToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedPromo: promoToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "promo was not deleted"
    });
  }
};

module.exports = deletePromo;
