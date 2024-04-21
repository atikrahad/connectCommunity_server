const express = require("express");
const group = express.Router();
const groupModel = require("../Models/groups");

// create a group

group.post("/", async (req, res) => {
  const queiry = req.query.id;
  const info = req.body;
  const mem = info.member
  mem.push(queiry);

  try {
    const createGroup = await groupModel.create({
      groupName: info.groupName,
      members: mem,
      description: info.description,
      groupAdmin: [queiry],
      groupPic: info.groupPic,
      groupCover: info.groupCover
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

// get a group by id

group.get("/:id", async (req, res) => {
  const id = req.params.id;
  const group = await groupModel
    .findOne({ _id: id })
    .populate("members", "name profilePic")
    .populate("groupAdmin", "name profilePic");

  res.send(group);
});

// get my groups 

group.get("/mygroup/:id", async(req, res)=>{
  const id = req.params.id

  const mygroup = await groupModel.find({members: id})
  if(mygroup){
    res.send(mygroup)
  }else{
    throw new Error("server error")
  }
})

// get all group and search group

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

// add a member in group

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

// leave a member grom group

group.put("/leave/:id", async (req, res) => {
  const groupId = req.params.id;
  const leaveId = req.body.leaveId;

  const group = await groupModel.findOne({
    _id: groupId,
    groupAdmin: [leaveId],
  });

  if (group) {
    res.status(400);
    throw new Error("server error");
  } else {
    const leaveMember = await groupModel.findOneAndUpdate(
      { _id: groupId },
      {
        $pull: {
          members: leaveId,
        },
      },
      { new: true }
    );
    res.send(200).json(leaveMember);
  }
});

// remove a member from the group

group.put("/removemembers/:id", async (req, res) => {
  const groupId = req.params.id;
  const admin = req.body.addminId;
  const removeMember = req.body.removeMember;

  const group = await groupModel.findOneAndUpdate(
    { _id: groupId, groupAdmin: [admin] },
    {
      $pull: {
        members: removeMember,
      },
    },
    { new: true }
  );
  if (!group) {
    res.status(400);
    throw new Error("server error");
  } else {
    res.status(200).json(group);
  }
});

// update a group

group.put("/updategroup/:id", async (req, res) => {
  const groupId = req.params.id;
  const admin = req.body.addminId;
  const updatevalue = req.body.update;

  const group = await groupModel.findOneAndUpdate(
    { _id: groupId, groupAdmin: [admin] },
    updatevalue,
    { new: true }
  );
  if (!group) {
    res.status(400);
    throw new Error("server error");
  } else {
    res.status(200).json(group);
  }
});

module.exports = group;
