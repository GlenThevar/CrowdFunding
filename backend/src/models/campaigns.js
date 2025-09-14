import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
});
export const campaigns = mongoose.model("campaigns", CampaignSchema);
