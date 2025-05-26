import mongoose from "mongoose";

const swapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offerListing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    requestListing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed"],
      default: "pending",
    },
    proposedDate: {
      type: Date,
    },
    messageThreadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageThread", // optional, if you implement in-app chat
    },
  },
  { timestamps: true }
);

const Swap = mongoose.model("Swap", swapSchema);
export default Swap;
