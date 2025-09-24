import Campaign from "../models/Campaign.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// Get all campaigns
export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json({ success: true, data: campaigns });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get campaign by ID
export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res
                .status(404)
                .json({ success: false, message: "Campaign not found" });
        }
        const transactions = await Transaction.find({ campaign: req.params.id })
      .populate("user");
        res.json({
            success: true,
            campaign,
            transactions,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Create new campaign
export const createCampaign = async (req, res) => {
    try {
        const newCampaign = new Campaign(req.body);
        const saved = await newCampaign.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Update campaign
export const updateCampaign = async (req, res) => {
    try {
        const updated = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res
                .status(404)
                .json({ success: false, message: "Campaign not found" });
        }
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Delete campaign
export const deleteCampaign = async (req, res) => {
    try {
        const deleted = await Campaign.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Campaign not found" });
        }
        res.json({ success: true, message: "Campaign deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
