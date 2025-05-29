import Quiz from "../models/quiz.model.js";
import QuizSubmission from "../models/quizSubmission.model.js";
import User from "../models/user.model.js";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const createQuiz = async (req, res) => {
  try {
    const { title, skillTag, questions } = req.body;

    if (!title || !skillTag || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newQuiz = await Quiz.create({
      title,
      skillTag,
      questions,
      createdBy: req.user._id,
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error.message);
    res.status(500).json({ message: "Server error creating quiz" });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const safeQuiz = {
      _id: quiz._id,
      title: quiz.title,
      skillTag: quiz.skillTag,
      questions: quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
      })),
    };

    res.json(safeQuiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { answers } = req.body;
    const userId = req.user._id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Calculate score
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswerIndex === answers[i]) {
        correct++;
      }
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= 80;

    const submission = await QuizSubmission.create({
      quiz: quiz._id,
      user: userId,
      score,
      passed,
    });

    // Optionally mark user as skill tested and add submission to passedQuizzes
    if (passed) {
      await User.findByIdAndUpdate(userId, {
        skillTested: true,
        $push: { passedQuizzes: submission._id }, // Add submission ID to passedQuizzes
      });
    }

    res.json({
      message: passed ? "You passed the quiz!" : "You did not pass the quiz.",
      score,
      passed,
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error.message);
    res.status(500).json({ message: "Server error submitting quiz" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    await QuizSubmission.deleteMany({ quiz: quiz._id }); // Clean up related submissions

    res.json({ message: "Quiz and related submissions deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz" });
  }
};

export const getUserQuizSubmissions = async (req, res) => {
  try {
    const submissions = await QuizSubmission.find({
      user: req.params.userId,
    }).populate("quiz");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz submissions" });
  }
};

export const getQuizzesBySkillTag = async (req, res) => {
  try {
    const tag = req.params.skillTag.toLowerCase().trim();
    const quizzes = await Quiz.find({ skillTag: tag });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quizzes by skill" });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, skillTag, questions } = req.body;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Update quiz fields
    if (title !== undefined) quiz.title = title;
    if (skillTag !== undefined) quiz.skillTag = skillTag;
    if (questions !== undefined) quiz.questions = questions;

    const updatedQuiz = await quiz.save();

    res.json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error.message);
    res.status(500).json({ message: "Error updating quiz", error: error.message });
  }
};

export const generateQuizWithAI = async (req, res) => {
  const { skillTag, title, numQuestions } = req.body;
  const prompt = `
    Create a ${numQuestions || 5}-question multiple-choice quiz about ${skillTag}.
    Each question should have 4 options and indicate the correct answer index.
    Format as JSON: [{questionText, options:[], correctAnswerIndex}]
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Parse the quiz from the AI's response
    let content = response.data.choices[0].message.content.trim();
    if (content.startsWith('```json')) {
      content = content.replace(/```json|```/g, '').trim();
    }
    const questions = JSON.parse(content);

    // Save to DB
    const quiz = await Quiz.create({
      title,
      skillTag,
      questions,
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error("OpenAI Quiz Generation Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate quiz", details: error.message });
  }
};

