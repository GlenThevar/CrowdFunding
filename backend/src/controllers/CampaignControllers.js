import campaigns from "../models/campaigns.js";
export async function createCampaign(req,res) {
    res.status(200).send("Note Created Successfully");
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