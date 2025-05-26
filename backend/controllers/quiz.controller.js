import Quiz from "../models/Quiz.js";
import QuizSubmission from "../models/QuizSubmission.js";
import User from "../models/user.model.js";


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

    res.json(quiz);
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
    const passed = score >= 70;

    const submission = await QuizSubmission.create({
      quiz: quiz._id,
      user: userId,
      score,
      passed,
    });

    // Optionally mark user as skill tested
    if (passed) {
      await User.findByIdAndUpdate(userId, { skillTested: true });
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
    const submissions = await QuizSubmission.find({ user: req.params.userId }).populate("quiz");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz submissions" });
  }
};
