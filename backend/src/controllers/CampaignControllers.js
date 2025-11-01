import mongoose from "mongoose";
import { campaigns } from "../models/campaigns.js";

export async function createCampaign(req, res) {
  try {
    const { title, discription, url, funds, faq, text, imageUrls, tags } =
      req.body;

    const userid = req.user.id;

    if (!userid) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const parsedFaq = JSON.parse(faq);
    const parsedTags = tags ? JSON.parse(tags) : undefined;

    const campaign = new campaigns({
      userid,
      title,
      discription,
      content: text,
      youtubeUrl: url,
      goalAmount: funds,
      imageUrls,
      faq: parsedFaq,
      tags: parsedTags,
      currentAmount: 0,
    });

    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    console.error("Error in created Campaign ", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createUpdate(req, res) {
  const { title, discription } = req.body;
  const userId = req.user.id;
  const campaignId = req.params.id;

  if (!title || !discription) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const campaign = await campaigns.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found." });
    }

    if (campaign.userid.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the creator of this campaign." });
    }

    const newUpdate = {
      Title: title,
      Discription: discription,
    };

    campaign.Updates.push(newUpdate);

    const updatedCampaign = await campaign.save();

    res.status(201).json(updatedCampaign);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error("Error creating the update:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function AllCampaign(req, res) {
  try {
    const allCampaigns = await campaigns
      .find()
      .populate("userid", "username profileUrl");
    res.status(200).json(allCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function TagsCampaigns(req, res) {
  try {
    const tagscampaign = await campaigns
      .find({ tags: req.params.tag })
      .populate("userid", "username profileUrl");
    res.status(200).json(tagscampaign);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function SingleCampaign(req, res) {
  try {
    const campaign = await campaigns.findById(req.params.id).populate("userid");
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    console.error("Error fetching campaign: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function UpdateCampaign(req, res) {
  try {
    const { title, discription, url, funds, faq, text, imageUrls, tags } =
      req.body;

    const creatorId = req.user.id;

    if (!creatorId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const parsedFaq = faq ? JSON.parse(faq) : undefined;
    const parsedTags = tags ? JSON.parse(tags) : undefined;

    const updateData = {
      title,
      discription,
      content: text,
      youtubeUrl: url,
      goalAmount: funds,
      imageUrls,
      faq: parsedFaq,
      tags: parsedTags,
    };

    const updatedCampaign = await campaigns.findOneAndUpdate(
      {
        _id: req.params.id,
        userid: creatorId,
      },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return res
        .status(404)
        .json({ message: "Campaign not found or user not authorized" });
    }
    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error("Error in updating Campaign", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Update Validation Failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function DeleteCampaign(req, res) {
  try {
    const creatorId = req.user.id;

    if (!creatorId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const deletedCampaign = await campaigns.findOneAndDelete({
      _id: req.params.id,
      userid: creatorId,
    });

    if (!deletedCampaign) {
      return res
        .status(404)
        .json({ message: "Campaign not found or user not authorized" });
    }
    res.status(200).json({ message: "Campaign Deleted Successfully" });
  } catch (error) {
    console.error("Error in Deleting Campaign", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function UserCampaigns(req, res) {
  try {
    const userid = req.params.id;

    if (!userid) {
      return res
        .status(400)
        .json({ message: "User ID is required in the body." });
    }
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: "Invalid User ID format." });
    }

    const userCampaigns = await campaigns
      .find({ userid: userid })
      .populate("userid");

    res.status(200).json(userCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns for user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
