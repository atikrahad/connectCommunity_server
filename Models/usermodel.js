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

  address: {},
  phone: {},
  education: {},
  gender: {},
  bio: {},
  socialmedia: {},
});

module.exports = userShema;
