import express from "express";
import {
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/conversations", protectedRoute, getConversations);
router.get("/messages/:userId", protectedRoute, getMessages);
router.post("/send", protectedRoute, (req, res) => {
  const io = req.app.get('io');
  sendMessage(req, res, io);
});

export default router; 