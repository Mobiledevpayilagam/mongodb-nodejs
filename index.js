import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./model/users.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

const mongoURL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.f0vll.mongodb.net/Users?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connection success"))
  .catch((e) => console.log(e));

app.get("/", (req, res, next) => {
  User.find({})
    .then((result) => {
      res.status(200).send("Welcome to the home page" + result);
    })
    .catch((e) => res.status(403).send("unable to find users"));
});

app.post("/", (req, res, next) => {
  console.log("inside home post route");
  console.log("Creating new user");
  const { userName, userEmail, userPhone } = req.body;

  console.log(userName, userEmail, userPhone);

  const user = new User({
    userEmail: userEmail,
    userName: userName,
    userPhone: userPhone,
  });

  user
    .save()
    .then((response) =>
      res.status(200).send("user created successfully" + response)
    )
    .catch((e) => console.log(e));
});

app.put("/", (req, res, next) => {
  console.log("inside home put route");
  const { userName } = req.body;
  console.log(userName);
  User.findOneAndUpdate({ userName: userName }, { userPhone: "666-666-6666" })
    .then((result) => res.status(200).send(result))
    .catch((e) => console.log("update error"));
});

app.delete("/", (req, res, next) => {
  console.log("inside home delete route");
  const { userName } = req.body;

  User.findOneAndDelete({ userName: userName })
    .then((result) => res.status(200).send(result))
    .catch((e) => console.log(e));
});

app.listen(6061, () => {
  console.log("Server running at PORT 6061");
});
