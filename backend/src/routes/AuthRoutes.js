import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/AuthControllers.js";

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
