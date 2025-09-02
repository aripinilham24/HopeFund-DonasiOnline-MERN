// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: { type: String }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
