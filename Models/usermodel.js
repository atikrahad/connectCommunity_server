const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joined: {
    type: Date,
    default: new Date(),
  },
  profilePic: {
    type: String,
    default:
      "https://i.ibb.co/xsH1Q1b/default-avatar-profile-icon-social-600nw-1677509740.webp",
  },
  coverPic: {},
  dateOfbirth: {type: Date},
  address: { type: Array },
  phone: { type: Array },
  education: { type: Array },
  gender: {},
  bio: {},
  socialmedia: { type: Array },
});

const userMolel = mongoose.model("user", userShema)

module.exports = userMolel;
