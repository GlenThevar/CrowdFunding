import { json } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
export async function signup(req,res) {
    try {
        const {name,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=new User({name,email,password:hashedPassword});
        await user.save();
        res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password
        })
    } catch (error) {
        res.status(404).json({message:"Error in Creating user",error});
    }
}
export async function login(req,res) {
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found",error});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid Credential"});
        }
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