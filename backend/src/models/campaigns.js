import mongoose from "mongoose";
// Create a Schema
// Model Based Off of that schema
const CampaignSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content: {
            type: String,
            required: true, 
        },
        goalAmount: {
            type: Number,
            required:true,
        },
        currentAmount: {
            type:Number,
            default:0,
        },
    },
);
const campaigns=mongoose.model("campaigns",CampaignSchema)
export default campaigns;