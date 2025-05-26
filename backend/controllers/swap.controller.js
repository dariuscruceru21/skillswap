import Swap from "../models/swap.model.js";
import Listing from "../models/listing.model.js";

export const createSwap = async (req, res) => {
  try {
    const { offerListing, requestListing, proposedDate } = req.body;

    const offer = await Listing.findById(offerListing);
    const request = await Listing.findById(requestListing);

    if (!offer || !request) {
      return res.status(404).json({ message: "Listings not found" });
    }

    const swap = await Swap.create({
      requester: req.user._id,
      recipient: request.owner, // Assuming your listing has `owner` field
      offerListing,
      requestListing,
      proposedDate,
    });

    res.status(201).json({ message: "Swap created", swap });
  } catch (error) {
    console.log("Error in createSwap", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMySwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
    })
      .populate("offerListing requestListing requester recipient")
      .sort({ createdAt: -1 });

    res.json({ swaps });
  } catch (error) {
    console.log("Error in getMySwaps", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const respondToSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body; // 'accepted' or 'declined'

    if (!["accepted", "declined"].includes(response)) {
      return res.status(400).json({ message: "Invalid response value" });
    }

    const swap = await Swap.findById(id);

    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to respond" });
    }

    swap.status = response;
    await swap.save();

    res.json({ message: `Swap ${response}`, swap });
  } catch (error) {
    console.log("Error in respondToSwap", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const markSwapAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const swap = await Swap.findById(id);

    if (!swap) return res.status(404).json({ message: "Swap not found" });

    // Only participants can mark as completed
    if (
      swap.requester.toString() !== req.user._id.toString() &&
      swap.recipient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    swap.status = "completed";
    await swap.save();

    res.json({ message: "Swap marked as completed", swap });
  } catch (error) {
    console.log("Error in markSwapAsCompleted", error.message);
    res.status(500).json({ message: error.message });
  }
};
