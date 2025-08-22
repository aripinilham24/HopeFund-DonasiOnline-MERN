import Campaign from "../models/Campaign";

export const campaignList = async (req, res) => {
    try {
        const campaigns = await Campaign.findAll();
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
