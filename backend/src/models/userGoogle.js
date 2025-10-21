import mongoose from "mongoose";

const userGoogleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: false,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
});

export const userGoogle = mongoose.model("UserGoogle", userGoogleSchema);
