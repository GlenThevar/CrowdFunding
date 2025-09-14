import Campaign from "../models/campaigns.js";
// const campaigns = require('../models/campaigns.js');

export async function createCampaign(req,res) {
        try{
            const{title,content,goalAmount}=req.body
            const campaign=new Campaign({title,content,goalAmount,currentAmount:0});
            const savedecampaign=await campaign.save();
            res.status(201).json(savedecampaign);
        }
        catch(error){
            console.error("Error in created Campaign ",error);
            res.status(500).json({message:"Internal Server Error"});
        }

};
export async function AllCampaign(req,res) {
    try {
        const allCampaign=await Campaign.find();
        res.status(200).json(allCampaign);
    } catch (error) {
        console.error("Error fetching campaigns:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};
export async function SingleCampaign(req,res) {
    try{
        const campaign=await Campaign.findById(req.params.id);
        if(!campaign){
            return res.status(404).json({message:"Campaign not found"});
        }
        res.status(200).json(campaign);
    }catch(error){
        console.error("Error fetching campaigns ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};


export async function UpdateCampaign(req,res){
    try {
        const{title,content,goalAmount}=req.body;
        const updateCampaign=await Campaign.findByIdAndUpdate(
            req.params.id,
            {title,content,goalAmount},
            {new: true}
        );
        if(!updateCampaign){
            return res.status(404).json({message:"Campaign not found"});
        }
        res.status(200).json(updateCampaign);
    } catch (error) {
        console.error("Error in updating Campaign",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export async function DeleteCampaign(req,res){
    try{
        const deletecampaign=await Campaign.findByIdAndDelete(req.params.id);
        if(!deletecampaign){
            return res.status(404).json({message:"Campaign not found"});
        }
        res.status(200).json({message:"Campaign Deleted Successfully"});
    }catch(error){
        console.error("Error in Deleing Campaign",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
