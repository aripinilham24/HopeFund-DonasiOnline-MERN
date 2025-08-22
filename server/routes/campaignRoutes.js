import express from "express";
import { campaignList } from "../controllers/campaignCont";

const router = express.Router();
router.get("/", campaignList);

export default router;