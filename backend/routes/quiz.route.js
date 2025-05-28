import express from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  deleteQuiz,
  getUserQuizSubmissions,
  getQuizzesBySkillTag,
  updateQuiz
} from "../controllers/quiz.controller.js";
import { protectedRoute,adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/",protectedRoute,adminRoute, createQuiz);
router.get("/",getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/submit", protectedRoute, submitQuiz);
router.delete("/:id", protectedRoute, adminRoute, deleteQuiz);
router.get("/user/:userId/submissions", protectedRoute, getUserQuizSubmissions);
router.get("/skill/:skillTag",  getQuizzesBySkillTag);
router.put("/:id", protectedRoute, adminRoute, updateQuiz);


export default router;