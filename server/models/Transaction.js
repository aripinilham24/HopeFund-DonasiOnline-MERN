// src/models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true, min: 1000 },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

transactionSchema.index({ campaign: 1, user: 1, createdAt: -1 });

export default mongoose.model("Transaction", transactionSchema);
