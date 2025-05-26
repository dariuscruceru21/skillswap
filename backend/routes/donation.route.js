import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { createDonationSession, handleStripeWebhook } from '../controllers/donation.controller.js';

const router = express.Router();   

router.post("/create-checkout-session",protectedRoute,createDonationSession);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;