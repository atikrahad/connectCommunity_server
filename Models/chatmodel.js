const mongoose = require("mongoose");

const chatShema = mongoose.Schema(
  {
    chstname: { type: String, trim: true },
    groupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    groupAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    letestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chat", chatShema);
module.exports = chatModel;
