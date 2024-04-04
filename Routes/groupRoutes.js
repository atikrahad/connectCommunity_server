const express = require("express");
const group = express.Router();
const groupModel = require("../Models/groups");
const userMod = require("../Models/usermodel");

group.post("/", async (req, res) => {
  const queiry = req.query.id;
  const info = req.body;
  const mem = JSON.parse(info.member);
  mem.push(queiry);

  try {
    const createGroup = await groupModel.create({
      groupName: info.name,
      members: mem,
      description: info.description,
      groupAdmin: [queiry],
    });

    const group = await groupModel
      .findOne({ _id: createGroup._id })
      .populate("members", "name profilePic ")
      .populate("groupAdmin", "name profilePic ");
    res.status(200).json(group);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = group;
