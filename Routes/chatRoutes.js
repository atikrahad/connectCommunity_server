const express = require("express");
const chat = express.Router();
const chatmodel = require("../Models/chatmodel");

chat.post("/", async (req, res) => {
  const id1 = req.body.id1;
  const id2 = req.body.id2;

  var isChat = await chatmodel.find({
    groupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: id1 } } },
      { users: { $elemMatch: { $eq: id2 } } },
    ],
  })
  .populate("users", "name profilePic _id")
  .populate("letestMessage")

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }

});

module.exports = chat;
