import express from "express";
import passport from "passport";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import "../auth/passport.js";
import {
  sendMessage,
  getChatList,
  getMessages,
  markMessagesAsSeen,
} from "../controllers/ChatController.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "crowdfunding/campaigns",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export const router = express.Router();

router.post(
  "/send/:receiverId",
  passport.authenticate(["jwt"], { session: false }),
  upload.single("image"),
  sendMessage
);

router.get(
  "/list/:userId",
  passport.authenticate(["jwt"], { session: false }),
  getChatList
);

router.get(
  "/messages/:chatId",
  passport.authenticate(["jwt"], { session: false }),
  getMessages
);

router.patch(
  "/messages/seen/:chatId",
  passport.authenticate(["jwt"], { session: false }),
  markMessagesAsSeen
);
