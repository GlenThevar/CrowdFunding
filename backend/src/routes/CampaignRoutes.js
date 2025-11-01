import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import passport from "passport";
import "../auth/passport.js";

import {
  createCampaign,
  DeleteCampaign,
  AllCampaign,
  SingleCampaign,
  UpdateCampaign,
  UserCampaigns,
  TagsCampaigns,
  createUpdate,
} from "../controllers/CampaignControllers.js";

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

const formatImageUrls = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.imageUrls = req.files.map((file) => file.path);
  } else if (req.method === "POST") {
    req.body.imageUrls = [];
  }
  next();
};

router.post(
  "/",
  passport.authenticate(["jwt"], { session: false }),
  upload.array("images", 10),
  formatImageUrls,
  createCampaign
);

router.get("/", AllCampaign);
router.get("/tag/:tag", TagsCampaigns);
router.get("/:id", SingleCampaign);
router.get("/user/:id", UserCampaigns);

router.patch(
  "/:id",
  passport.authenticate(["jwt"], { session: false }),
  upload.array("images", 10),
  formatImageUrls,
  UpdateCampaign
);

router.delete(
  "/:id",
  passport.authenticate(["jwt"], { session: false }),
  DeleteCampaign
);

router.post(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  createUpdate
);
