import { redis } from "../lib/redis.js";
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

export const getFeaturedListings = async (req, res) => {
  try {
    let featuredListings = await redis.get("featuredListings");
    if (featuredListings) {
      return res.json(JSON.parse(featuredListings));
    }

    //if not in redis we fetch from mongodb
    // .lean() returns plain JavaScript objects instead of Mongoose documents
    //which is good for performance
    featuredListings = await Listing.find({ isFeatured: true }).lean();

    if (!featuredListings) {
      return res.status(404).json({ message: "No featured listings found" });
    }

    //store in redis for future requests
    await redis.set("featuredListings", JSON.stringify(featuredListings));
    res.json(featuredListings);
  } catch (error) {
    console.log("Error in getFeaturedListings controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const { name, description, type, category, image } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "listings",
      });
    }

    const listing = await Listing.create({
      name,
      description,
      type,
      category,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "", // Use the secure URL from Cloudinary
    });
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.log("Error in createListing controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.image) {
      // If the listing has an image, delete it from Cloudinary
      const publicId = listing.image.split("/").pop().split(".")[0]; // Extract public ID from URL
      try {
        await cloudinary.uploader.destroy(`listings/${publicId}`);
        console.log("Image deleted from Cloudinary successfully");
      } catch (error) {
        console.log("Error deleting image from Cloudinary", error.message);
      }
    }
    await Listing.findAndDelete(req.params.id); // Remove the listing from the database
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log("Error in deleteListing controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const getRecommandedListings = async (req, res) => {
  try {
    const listings = await Listing.aggregate([
      {
        $sample: { size: 3 }, // Randomly select 10 listings
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          category: 1,
          type: 1,
          image: 1,
        },
      },
    ]);
  } catch (error) {
    console.log("Error in getRecommandedListings controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const getListingsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const listings = await Listing.find({ category });
        res.json({ listings });
    } catch (error) {
        console.log("Error in getListingsByCategory controller", error.message);
        res.status(500).json({ message: error.message });
        
    }
}
export const toggleFeaturedListing = async (req,res) =>{
    try {
        const listing = await Listing.findById(req.params.id);
         if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }else{
            listing.isFeatured = !listing.isFeatured; // Toggle the isFeatured status
            const updatedListing = await listing.save(); // Save the updated listing
            //update cache
            await updateFeatureListingsCache();
            res.json(updatedListing);
        }
    } catch (error) {
        console.log("Error in toggleFeaturedListing controller", error.message);
        res.status(500).json({ message: error.message });
        
    }
}

async function updateFeatureListingsCache() {
    try {
        //the lean() method returns plain JavaScript objects instead of Mongoose documents
        //which is good for performance
        const featuredListings = await Listing.find({ isFeatured: true }).lean();
        await redis.set("featuredListings", JSON.stringify(featuredListings));
    } catch (error) {
        console.log("Error in updateFeatureListingsCache", error.message);
        
    }
}