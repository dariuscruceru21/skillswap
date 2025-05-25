import express from "express";
import {
  getAllListings,
  createListing,
  getFeaturedListings,
  deleteListing,
  getRecommandedListings,
  getListingsByCategory,
  toggleFeaturedListing,
} from "../controllers/listings.controller.js";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllListings);
router.get("/featured", getFeaturedListings);
router.get("/category/:category", getListingsByCategory);
router.get("/recommandations", getRecommandedListings);
router.post("/", protectedRoute, adminRoute, createListing);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedListing);
router.post("/:id", protectedRoute, adminRoute, deleteListing);

export default router;
