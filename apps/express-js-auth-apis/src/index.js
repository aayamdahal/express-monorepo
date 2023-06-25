require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("./model/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");

mongoose.connect("mongodb://localhost:27017/user-mgmt-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

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

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
