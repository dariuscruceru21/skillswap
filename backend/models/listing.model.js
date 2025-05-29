import mongoose from "mongoose";

const listingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    type: {
      type: String,
      enum: ["offer", "request"],
      required: [true, "Type is required"],
    },
    archived: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, // Cloudinary URL or base64
      required: [false, "Image is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Listing = mongoose.model("Listing", listingsSchema);

export default Listing;
