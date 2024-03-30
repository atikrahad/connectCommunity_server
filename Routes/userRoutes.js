const express = require("express");
const mongoose = require("mongoose");
const user = express.Router();
const userschema = require("../Models/usermodel");
const Usermodel = mongoose.model("user", userschema);
const token = require("../config/jwt");

user.post("/", async (req, res) => {
  const user = new Usermodel(req.body);
  await user
    .save()
    .then((re) => res.status(200).send({
        name: re.name,
        email: re.email,
        tok: token(re._id) 
    }))
    .catch((err) => res.status(500).send("server error"));
});

module.exports = user;
