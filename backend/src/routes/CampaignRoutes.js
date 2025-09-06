import express from "express";
const router = express.Router();
import { createCampaign,DeleteCampaign,AllCampaign,SingleCampaign,UpdateCampaign } from "../controllers/CampaignControllers.js";

router.post("/",createCampaign);
router.get("/",AllCampaign);
router.get("/:id",SingleCampaign);
router.patch("/:id",UpdateCampaign);
router.delete("/:id",DeleteCampaign);
export default router;