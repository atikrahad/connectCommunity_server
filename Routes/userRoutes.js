const express = require("express");
const mongoose = require("mongoose");
const user = express.Router();
const Usermodel = require("../Models/usermodel");
const token = require("../config/jwt");

user.post("/", async (req, res) => {
  const user = new Usermodel(req.body);
  await user
    .save()
    .then((re) =>
      res.status(200).send({
        name: re.name,
        email: re.email,
        tok: token(re._id),
      })
    )
    .catch((err) => res.status(500).send("server error"));
});

user.get("/", async (req, res) => {
  const query = req.query.email;
  const myprofile = await Usermodel.findOne({ email: query });
  if (myprofile) {
    res.status(200).send(myprofile);
  } else {
    res.status(500).send("server error");
  }
});
user.get("/all", async (req, res) => {
  const query = req.query.email;
  const search = req.query.search;
  console.log(query, search);

  const keyword = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  const srearchedUsers = await Usermodel.find(keyword).find({
    email: { $ne: query },
  });
  res.send(srearchedUsers);
  
});

user.put("/", async (req, res) => {
  const query = req.query.email;
  const info = req.body;
  const updateData = await Usermodel.findOneAndUpdate({ email: query }, info, {
    new: true,
    upsert: true,
    runValidators: true,
  })
    .then(() => res.send(updateData))
    .catch(() => res.status(500).send("server error"));
});

user.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userInfo = await Usermodel.findOne({ _id: id });
  if (userInfo) {
    res.status(200).send(userInfo);
  } else {
    res.status(500).send("server error");
  }
});

module.exports = user;
