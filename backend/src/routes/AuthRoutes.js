import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import "../auth/passport.js";

import {
  registerController,
  loginController,
  checkDuplicateController,
  verifyEmail,
  checkAccessToken,
  // returnCookie,
} from "../controllers/AuthControllers.js";

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/checkduplicate", checkDuplicateController);
router.post("/verifyemail", verifyEmail);
router.post("/verifytoken", checkAccessToken);
// router.get("/returncookie", returnCookie);

// router.get("/logout", (req, res) => {
//   res.clearCookie("accessToken");
//   res.redirect("/campaigns");
// });
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/auth",
//     session: false,
//   }),
//   (req, res) => {
//     const accessToken = jwt.sign(
//       { id: req.user._id, username: req.user.username },
//       process.env.jwt_secret_key,
//       {
//         expiresIn: "1d",
//       }
//     );
//     return res
//       .cookie("oauthToken", accessToken, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//         secure: false,
//         sameSite: "lax",
//       })
//       .redirect("http://localhost:5175/");
//   }
// );
