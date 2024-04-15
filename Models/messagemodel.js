const mongoose = require("mongoose");

const messageShema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: { type: String, trim: true },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("message", messageShema);
module.exports = messageModel;
