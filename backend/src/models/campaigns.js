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
        amountRaised: {
            type:Number,
            default:0,
        },
    },
);
const Campaign = mongoose.model("Campaign", CampaignSchema);
export { Campaign };
export default Campaign;
