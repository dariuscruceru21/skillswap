import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  skillTag: {
    type: String, // e.g., "guitar", "photoshop"
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswerIndex: Number,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Quiz", quizSchema);
