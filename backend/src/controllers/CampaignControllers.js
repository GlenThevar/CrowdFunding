import campaigns from "../models/campaigns.js";
// const campaigns = require('../models/campaigns.js');

export async function createCampaign(req,res) {
        try{
            const{title,content}=req.body
            const campaign=new campaigns({title,content});
            const savedecampaign=await campaign.save();
            res.status(201).json(savedecampaign);
        }
        catch(error){
            console.error("Error in created Campaign ",error);
            res.status(500).json({message:"Internal Server Error"});
        }

};
export async function AllCampaign(req,res) {
    res.status(200).send("All Notes");
};
export async function SingleCampaign(req,res) {
    res.status(200).send("Single Note");
};
export async function UpdateCampaign(req,res){
    res.status(200).send("Updated Campaign");
}
export async function DeleteCampaign(req,res){
    res.status(200).send("Campaign Deleted");
}