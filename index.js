const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT | 5000;
const handleUser = require("./Routes/userRoutes");
const handleGroup = require("./Routes/groupRoutes");
const handleChat = require("./Routes/chatRoutes")

app.use(express.json());

mongoose
  .connect(`${process.env.URI}`)
  .then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));

app.use("/user", handleUser);
app.use("/group", handleGroup);
app.use("/chat", handleChat);

app.get("/", (req, res) => {
  res.send("BondBox server is running");
});

app.listen(port, () => {
  console.log("server is running with port", port);
});
