import { json } from "express";
import User from "../models/user.js";
export async function signup(req,res) {
    try {
        const {name,email,password}=req.body;
        const user=new user({name,email,password});
    } catch (error) {
        res.status(404).json({message:"Error in Creating user",error});
    }
}
export async function login(req,res) {
    try {
        const {email,password}=req.body;
        const user=await user.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found",error});
        }
        // Password logic is remainging
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message:"Error in log in ",error});
    }
}
export async function getprofile(req,res) {
    try {
        const user =await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message:"Error in fetching Profile",error});
    }
}