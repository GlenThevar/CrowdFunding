import mongoose from "mongoose";

function contentValidation(val) {
  return val.text || val.image;
}

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: {
        text: { type: String },
        image: { type: String },
      },
      validate: [
        contentValidation,
        "Content must have at least text or an image",
      ],
      required: true,
      _id: false,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Messages = mongoose.model("messages", messageSchema);
