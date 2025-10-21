import express from "express";
<<<<<<< HEAD

import { createCampaign,DeleteCampaign,AllCampaign,SingleCampaign,UpdateCampaign } from "../controllers/CampaignControllers.js";

const router = express.Router();

router.post("/",createCampaign);
router.get("/",AllCampaign);
router.get("/:id",SingleCampaign);
router.patch("/:id",UpdateCampaign);
router.delete("/:id",DeleteCampaign);

export default router;
=======
import passport from "passport";

import "../auth/passport.js";

import {
  createCampaign,
  DeleteCampaign,
  AllCampaign,
  SingleCampaign,
  UpdateCampaign,
} from "../controllers/CampaignControllers.js";

export const router = express.Router();

router.post(
  "/",
  passport.authenticate(["jwt"], { session: false }),
  createCampaign
);
router.get(
  "/",
  passport.authenticate(["jwt"], { session: false }),
  AllCampaign
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  SingleCampaign
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UpdateCampaign
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  DeleteCampaign
);
>>>>>>> AuthBackEnd
