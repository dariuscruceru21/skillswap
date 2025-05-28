import express from "express";
import {
  signup,
  signin,
  logout,
  refreshToken,
  getProfile,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  createReview
} from "../controllers/auth.controller.js";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectedRoute, getProfile);
router.get("/users", protectedRoute, adminRoute, getAllUsers);
router.post("/users", protectedRoute, adminRoute, createUser);
router.put("/users/:id", protectedRoute, adminRoute, updateUser);
router.delete("/users/:id", protectedRoute, adminRoute, deleteUser);
router.post("/users/:id/reviews", protectedRoute, createReview);

export default router;
