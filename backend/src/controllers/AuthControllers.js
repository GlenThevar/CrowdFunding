import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { users } from "../models/user.js";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new users({
      username,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("Error in registering user: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await users.findOne({ username: username });
    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist. Try a different email/password",
      });
    }
    if (!bcrypt.compare(password, userExist.password)) {
      return res.status(400).json({
        message: "Password is wrong",
      });
    }

    const accessToken = jwt.sign(
      { id: userExist._id, username: username },
      process.env.jwt_secret_key,
      {
        expiresIn: "1d",
      }
    );
    return res
      .status(200)
      .json({ message: "user logged in", accessToken: accessToken });
  } catch (err) {
    console.log("Error" + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
