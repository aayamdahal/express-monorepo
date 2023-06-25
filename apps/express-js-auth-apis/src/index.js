require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("./model/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/user-mgmt-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("---DATABASE CONNECTED----");

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "static")));

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await UserModel.findOne({ email });
  if (!isUserExist) {
    return res.status(401).json({
      message: "Invalid email/password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email/password",
    });
  } else {
    const token = jwt.sign(
      {
        id: isUserExist._id,
        email: isUserExist.email,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  }
});

app.post("/auth/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: "Invalid email/password",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }
  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  // check duplicate user
  const isUserExists = await UserModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  try {
    const response = await UserModel.create({
      email,
      password: await bcrypt.hash(password, 10),
    });
    return res.status(200).json({
      id: response._id,
      message: "User created successfully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
