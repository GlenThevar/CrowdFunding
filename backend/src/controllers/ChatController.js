import { Chats } from "../models/chats.js";
import { Messages } from "../models/message.js";
import mongoose from "mongoose";

export async function sendMessage(req, res) {
  try {
    const { sender, content } = req.body;
    const receiver = req.params.receiverId;

    if (
      !mongoose.Types.ObjectId.isValid(sender) ||
      !mongoose.Types.ObjectId.isValid(receiver)
    ) {
      return res.status(400).json({ message: "Invalid sender or receiver ID" });
    }

    let chat = await Chats.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!chat) {
      chat = await Chats.create({
        participants: [sender, receiver],
      });
    }

    const newMessage = await Messages.create({
      chat: chat._id,
      sender,
      content,
    });

    chat.lastMessage = newMessage._id;
    await chat.save();

    const populatedChat = await Chats.findById(chat._id)
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "username profileUrl" },
      })
      .populate("participants", "username profileUrl");

    return res.status(200).json({
      message: "Message sent successfully",
      data: populatedChat,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getChatList(req, res) {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const chatList = await Chats.find({
      participants: userId,
    })
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "username profileUrl" },
      })
      .populate("participants", "username profileUrl")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Chats fetched successfully",
      data: chatList,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMessages(req, res) {
  try {
    const chatId = req.params.chatId;

    const messages = await Messages.find({ chat: chatId })
      .populate("sender", "username profileUrl")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
