const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    product: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    mark: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
