import express from "express";
import { getAllListings } from "../controllers/listings.controller.js"; 
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllListings);

export default router;
