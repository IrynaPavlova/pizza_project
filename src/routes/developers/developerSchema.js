const mongoose = require("mongoose");
const { Schema } = mongoose;

const developerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    avatarLink: {
      type: String,
      required: true
    },
    social: {
      type: String,
      required: true
    },
    github: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;
