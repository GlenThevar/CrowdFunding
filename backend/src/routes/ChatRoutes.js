import express from "express";
import {
  sendMessage,
  getChatList,
  getMessages,
} from "../controllers/ChatController.js";

export const router = express.Router();

router.post("/send/:receiverId", sendMessage);
router.get("/list/:userId", getChatList);
router.get("/messages/:chatId", getMessages);
