import express from "express";

import { createCampaign,DeleteCampaign,AllCampaign,SingleCampaign,UpdateCampaign } from "../controllers/CampaignControllers.js";

const router = express.Router();

router.post("/",createCampaign);
router.get("/",AllCampaign);
router.get("/:id",SingleCampaign);
router.patch("/:id",UpdateCampaign);
router.delete("/:id",DeleteCampaign);

export default router;