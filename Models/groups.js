const mongoose = require("mongoose");

const groupScema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    groupAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createAt: {
      type: Date,
      default: new Date(),
    },
    groupPic: {
      type: String,
      default: "https://i.ibb.co/2kdqktN/istockphoto-589440682-612x612.jpg",
    },
    groupCover: {
      type: String,
      default:
        "https://i.ibb.co/ZdPj5jx/group-diverse-people-holding-blank-banners-107791-11880.jpg",
    },
  },
  { timestamps: true }
);

const group = mongoose.model("group", groupScema)

module.exports = group