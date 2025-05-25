import Listing from "../models/listing.model.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({}); //find all listings
    res.json({ listings });
  } catch (error) {
    console.log("Error in getAllListings controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
