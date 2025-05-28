import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  icon: {
    type: String, // e.g., "guitar", "laptop", or a URL to an icon
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Skill", skillSchema);