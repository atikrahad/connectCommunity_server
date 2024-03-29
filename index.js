const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const port = process.env.PORT | 5000;

app.use(express.json());

mongoose
  .connect(`${process.env.URI}`)
  .then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("BondBox server is running");
});

app.listen(port, () => {
  console.log("server is running with port", port);
});
