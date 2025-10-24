import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import passport from "passport";
import "../auth/passport.js";

import { getUserData, updateProfile } from "../controllers/UserController.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "crowdfunding/users",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export const router = express.Router();

router.get("/:id", getUserData);
router.post(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  upload.single("file"),
  updateProfile
);
