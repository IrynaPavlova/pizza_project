const Comment = require("../commentSchema");
const getToken = require("../../../helpers/getToken");

const deleteComment = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const id = request.params.id;

    const commentToDelete = await Comment.findById(id);
    await commentToDelete.remove();

    response.status(200).json({
      status: "success",
      deletedComment: commentToDelete
    });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "comment was not deleted"
    });
  }
};

module.exports = deleteComment;
