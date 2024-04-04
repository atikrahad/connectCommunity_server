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

group.get("/:id", async (req, res) => {
  const id = req.params.id;
  const group = await groupModel
    .findOne({ _id: id })
    .populate("members", "name profilePic")
    .populate("groupAdmin", "name profilePic");

  res.send(group);
});

group.get("/", async (req, res) => {
  const search = req.query.search;

  if (search !== "") {
    const groups = await groupModel
      .find({
        groupName: { $regex: search, $options: "i" },
      })
      .sort({ createdAt: -1 });
    res.send(groups);
  } else {
    const groups = await groupModel.find().sort({ createdAt: -1 });
    res.send(groups);
  }
});

group.put("/addmembers/:id", async (req, res) => {
  const groupId = req.params.id;
  const admin = req.body.addminId;
  const neweMember = req.body.newMember;

  const group = await groupModel
    .findOneAndUpdate(
      { _id: groupId, groupAdmin: [admin] },
      {
        $push: {
          members: neweMember,
        },
      },
      { new: true }
    )
    .populate("members", "name profilePic");
  if (!group) {
    res.status(400);
    throw new Error("server error");
  } else {
    res.status(200).json(group);
  }
});

group.put("/removemembers/:id", async (req, res) => {
  const groupId = req.params.id;
  const admin = req.body.addminId;
  const removeMember = req.body.removeMember;

  const group = await groupModel
    .findOneAndUpdate(
      { _id: groupId, groupAdmin: [admin] },
      {
        $pull: {
          members: removeMember,
        },
      },
      { new: true }
    )
    if (!group) {
      res.status(400);
      throw new Error("server error");
    } else {
      res.status(200).json(group);
    }
});

group.put("/updategroupcover/:id", async (req, res) => {
  const groupId = req.params.id;
  const admin = req.body.addminId;
  const newGroupCover = req.body.groupCover;

  const group = await groupModel
    .findOneAndUpdate(
      { _id: groupId, groupAdmin: [admin] },
      {
        $set: {
          groupCover: newGroupCover,
        },
      },
      { new: true }
    )
    if (!group) {
      res.status(400);
      throw new Error("server error");
    } else {
      res.status(200).json(group);
    }
});
group.put("/updategrouppic/:id", async (req, res) => {
  const groupId = req.params.id;
  const admin = req.body.addminId;
  const newGroupPic = req.body.groupPic;

  const group = await groupModel
    .findOneAndUpdate(
      { _id: groupId, groupAdmin: [admin] },
      {
        $set: {
          groupPic: newGroupPic,
        },
      },
      { new: true }
    )
    if (!group) {
      res.status(400);
      throw new Error("server error");
    } else {
      res.status(200).json(group);
    }
});

module.exports = group;
