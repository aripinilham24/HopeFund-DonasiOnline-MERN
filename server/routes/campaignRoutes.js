import express from "express";
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/", getCampaigns);          // GET all
router.get("/:id", getCampaignById);    // GET one
router.post("/", createCampaign);       // POST new
router.put("/:id", updateCampaign);     // PUT update
router.delete("/:id", deleteCampaign);  // DELETE

export default router;
