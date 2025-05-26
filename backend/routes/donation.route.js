import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();   

router.post("/create-checkout-session",protectedRoute,createDonationSession);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;