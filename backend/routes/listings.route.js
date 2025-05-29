import express from "express";
import {
  getAllListings,
  createListing,
  getFeaturedListings,
  getAllListingsFoExplore,
  deleteListing,
  getRecommandedListings,
  getListingsByCategory,
  toggleFeaturedListing,
  getMatchedListingsForUser,
  updateListing
} from "../controllers/listings.controller.js";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllListings);
router.get("/explore", getAllListingsFoExplore);
router.get("/featured", getFeaturedListings);
router.get("/category/:category", getListingsByCategory);
router.get("/recommandations", getRecommandedListings);
router.post("/", protectedRoute, createListing);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedListing);
router.delete("/:id", protectedRoute, adminRoute, deleteListing);
router.get("/match", protectedRoute, getMatchedListingsForUser);
router.put("/:id", protectedRoute, adminRoute, updateListing);


export default router;
