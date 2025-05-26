// routes/swap.routes.js
import express from "express";
import {
  createSwap,
  getMySwaps,
  respondToSwap,
  markSwapAsCompleted,
} from "../controllers/swap.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectedRoute, createSwap);
router.get("/my-swaps", protectedRoute, getMySwaps);
router.patch("/:id/respond", protectedRoute, respondToSwap);
router.patch("/:id/complete", protectedRoute, markSwapAsCompleted);

export default router;
