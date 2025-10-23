import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdProjects: {
    type: Number,
    default: 0,
  },
  backedProjects: {
    type: Number,
    default: 0,
  },
  basedLocation: {
    type: String,
    default: "",
  },
  shortDiscription: {
    type: String,
    default: "",
  },
  longDiscription: {
    type: String,
    default: "",
  },
  lastLogin: {
    type: Date,
    required: true,
  },
  accountCreated: {
    type: Date,
    required: true,
  },
  links: [{ type: String, trim: true }],
});

export const users = mongoose.model("User", userSchema);
