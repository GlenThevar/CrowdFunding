import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Cookies from "js-cookie";

import { users } from "../models/user.js";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { username, email, password, lastLogin, accountCreated } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new users({
      username,
      email,
      password: hashedPassword,
      lastLogin,
      accountCreated,
    });
    const savedUser = await user.save();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "th3var@gmail.com",
        pass: "mocy lnev aclx mhdd",
      },
    });

    const emailToken = jwt.sign({ email: email }, process.env.jwt_secret_key, {
      expiresIn: "1d",
    });

    const mailOptions = {
      from: "Fund It Team",
      to: email,
      subject: "Verify your Fund It account",
      text: `Hey there!

Thanks for joining Fund It — we’re excited to have you onboard.

Please verify your email to activate your account: 

http://localhost:5175/auth/verify?token=${emailToken}

If you didn’t sign up for Fund It, you can safely ignore this message.

Cheers,
The Fund It Team
`,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(info);
      }
    });

    res.status(201).json(savedUser);
  } catch (err) {
    console.log("Error in registering user: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send("Missing Token");

    const decoded = jwt.verify(token, process.env.jwt_secret_key);
    const user = await users.findOne({ email: decoded.email });

    if (!user) return res.status(404).send("User not found");

    user.isVerified = true;
    await user.save();

    res.status(200).send("Verification done successfully");
  } catch (error) {
    console.log("Error in verfiying email: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkDuplicateController = async (req, res) => {
  try {
    const { username, email } = req.body;
    const result = await users.find({
      $or: [{ username: username }, { email: email }],
    });
    return res.status(201).json(result);
  } catch (err) {
    console.log("Error in checking duplicate user: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await users.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        message: "User does not exist. Try a different email/password",
      });
    }

    if (!userExist.isVerified) {
      return res.status(401).json({
        message: "Email verification not done",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(409).json({
        message: "Password is wrong",
      });
    }

    const accessToken = jwt.sign(
      { id: userExist._id, email: userExist.username },
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

export const checkAccessToken = async (req, res) => {
  const { token } = req.body;
  const result = jwt.verify(token, process.env.jwt_secret_key);
  if (result) return res.status(200).json({ message: "success", data: result });
  else return res.status(404).json({ message: "failure" });
};

export const returnCookie = () => {
  const ck = Cookies.get("oauthToken");
  console.log(ck);
};
