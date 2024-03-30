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
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://i.ibb.co/xsH1Q1b/default-avatar-profile-icon-social-600nw-1677509740.webp",
  },
});

const user = mongoose.model("user", userShema);

module.exports = user;
