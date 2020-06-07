const Comment = require("../commentSchema");
//const getToken = require("../../../helpers/getToken");

const getComment = async (request, response) => {
  try {
    // const token = getToken(request);
    // if (!token) {
    //   return response.status(403).send({
    //     status: "failed",
    //     message: "No token provided"
    //   });
    // }
    const stringProduct = Object.values(request.query)[0];
    const product = stringProduct.slice(1, stringProduct.length - 1);

    const comment = await Comment.find({ product });

    response.status(200).json({ status: "success", comments: comment });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "no comments"
    });
  }
};

module.exports = getComment;
