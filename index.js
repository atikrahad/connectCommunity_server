const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT | 5000;
const handleUser = require('./Routes/userRoutes')


app.use(express.json());

mongoose
.connect(`${process.env.URI}`)
.then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));

  app.use("/user", handleUser)

  
app.get("/", (req, res) => {
  res.send("BondBox server is running");
});

app.listen(port, () => {
  console.log("server is running with port", port);
});
