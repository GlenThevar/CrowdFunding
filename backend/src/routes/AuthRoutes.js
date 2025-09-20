import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import "../auth/passport.js";

import {
  registerController,
  loginController,
} from "../controllers/AuthControllers.js";

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.redirect("/campaigns");
  // for the JWT ( normal and not Oauth ) based authentication clear on the client side
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth",
    session: false,
  }),
  (req, res) => {
    const accessToken = jwt.sign(
      { id: req.user._id, username: req.user.username },
      process.env.jwt_secret_key,
      {
        expiresIn: "1d",
      }
    );
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
      })
      .redirect("/campaigns");
  }
);
