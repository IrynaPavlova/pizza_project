const Image = require("../imageSchema");
const Product = require("../../products/productSchema");
//const User = require("../../users/userSchema");
const path = require("path");
const { port } = require("../../../../config");
const getToken = require("../../../helpers/getToken");

const saveImage = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const body = request.body;
    const productId = body.productId;
    const imagePath = body.file.path;
    const imageStats = path.parse(imagePath);
    const imageUrl = `http://localhost:${port}/` + imageStats.base;
    imageData = {
      productId: productId,
      file: imageUrl
    };

    const newImage = new Image(imageData);
    const ImageToSave = await newImage.save();

    const product = await Product.findById(productId);
    const productImages = product.images;
    productImages.push(imageUrl);

    await Product.findOneAndUpdate(
      { _id: ImageToSave.productId },
      { images: productImages },
      { new: true }
    );

    response.status(201).json({
      status: "success",
      image: ImageToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "image was not saved"
    });
  }
};

module.exports = saveImage;
