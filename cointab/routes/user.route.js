const { UserModel } = require("../models/user.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "cointab";

const { Router } = require("express");
const userController = Router();

// http://localhost:8080/user/signup
userController.post("/signup", async (req, res) => {
  let { email, password, wrongCount } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).send({ error: false, msg: "User Already exist" });
  }
  bcrypt
    .hash(password, 5)
    .then(async (hash) => {
      const user = new UserModel({ email, password: hash, wrongCount });
      await user.save();
      res.status(200).send({ error: false, msg: "User created successfully" });
    })
    .catch((err) => res.status(200).send({ error: true, msg: "Try again" }));
});

// http://localhost:8080/user/login
userController.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  // console.log(user.wrongCount);

  if (!user) {
    return res.status(200).send({ error: true, msg: "Invalid Username" });
  }

  let hash = user.password;

  bcrypt.compare(password, hash, async (err, result) => {
    if (result) {
      let token = jwt.sign({ userId: user._id }, SECRET_KEY);
      await UserModel.findOneAndUpdate(
        { email: user.email },
        {
          wrongCount: 0,
        }
      );
      res.status(200).send({
        error: false,
        token: token,
      });
    } else {
      //updated wrongCount
      await UserModel.findOneAndUpdate(
        { email: user.email },
        {
          wrongCount: user.wrongCount + 1,
        }
      );

      if (user.wrongCount >= 2) {
        date = Date.now();
        console.log(date);
        await UserModel.findOneAndUpdate(
          { email: user.email },
          { lastWrong: date }
        );
        return res
          .status(200)
          .send({ error: true, msg: "Blocked user for 24 hr" });
      }
      res.status(200).send({
        error: true,
        msg: "Invalid login credentials",
      });
    }
  });
});

module.exports = { userController };
