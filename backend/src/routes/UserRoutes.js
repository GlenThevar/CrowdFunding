import express from "express";
import {signup,login,getprofile} from "../controllers/UserControllers.js";
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.get("/me",getprofile);
export default router;