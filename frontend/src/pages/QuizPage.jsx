import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarHomePage from "../components/HomePageComponents/NavbarHomePage";
import Footer from "../components/ProfilePageComponents/ProfileFooter";
import api from "../lib/axios";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        // Fetch quiz details (excluding correct answers for security on frontend)
        const response = await api.get(`/api/quiz/${quizId}`);
        setQuiz(response.data);
        setUserAnswers(new Array(response.data.questions.length).fill(null)); // Initialize answers with null
      } catch (error) {
        toast.error("Error fetching quiz");
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/api/quiz/${quizId}/submit`, { answers: userAnswers });
      setSubmissionResult(response.data);
      setSubmitted(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting quiz");
      console.error("Error submitting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-700">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-500">Quiz not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <NavbarHomePage />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{quiz.title}</h1>
        <p className="text-gray-600 mb-8">Skill: {quiz.skillTag}</p>

        {!submitted ? (
          <div className="space-y-6">
            {quiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{qIndex + 1}. {question.questionText}</h2>
                <div className="space-y-3">
                  {question.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      className={`w-full text-left px-4 py-3 border rounded-md transition-colors ${
                        userAnswers[qIndex] === oIndex
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))
                  
                  }
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmitQuiz}
              disabled={userAnswers.some(answer => answer === null) || loading}
              className="w-full gradient-bg text-white py-3 rounded-lg hover:opacity-90 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
            <p className="text-xl text-gray-700 mb-2">Your Score: {submissionResult?.score}%</p>
            <p className={`text-xl font-semibold ${submissionResult?.passed ? "text-green-600" : "text-red-600"}`}>
              {submissionResult?.passed ? "You Passed!" : "You Did Not Pass"}
            </p>
            {/* Optionally add a button to view correct answers or retry */}
            <button
              onClick={() => setSubmitted(false)} // Simple retry/view answers button for now
              className="mt-6 px-6 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300"
            >
              Try Again or View Answers
            </button>
            <button
              onClick={() => navigate('/homepage')}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 ml-4"
            >
              Go Back Home
            </button>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
} 