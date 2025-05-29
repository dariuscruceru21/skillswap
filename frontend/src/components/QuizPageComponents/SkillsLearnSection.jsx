import React, { useState, useEffect } from "react";
import api from "../../lib/axios";
import { useUserStore } from "../../stores/useUserStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SkillsLearnSection() {
  const [activeTab, setActiveTab] = useState("learn");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, fetchProfile } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
    fetchProfile();
  }, [fetchProfile]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/quiz");
      setQuizzes(response.data);
    } catch (error) {
      toast.error("Error fetching quizzes");
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async (quizId) => {
    try {
      const response = await api.get(`/api/quiz/${quizId}`);
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      toast.error("Error starting quiz");
      console.error("Error starting quiz:", error);
    }
  };

  // Filter quizzes based on search query and passed quizzes
  const passedQuizIds = new Set(user?.passedQuizzes?.map(submission => submission.quiz?._id).filter(id => id));

  const filteredQuizzes = quizzes.filter(quiz =>
    (!passedQuizIds.has(quiz._id)) && // Exclude quizzes the user has passed
    (quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.skillTag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get unique skills from passed quizzes
  const currentSkills = user?.passedQuizzes?.map(submission => ({
    name: submission.quiz.skillTag,
    score: submission.score,
    passed: submission.passed
  })) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
        <p className="mt-2 text-gray-600">
          Manage your current skills and discover new ones to learn
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "current"
                ? "tab-active border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("current")}
          >
            My Current Skills
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "learn"
                ? "tab-active border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("learn")}
          >
            Skills I Can Learn
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "current" && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            My Current Skills
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : currentSkills.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {currentSkills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="p-4 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        Score: {skill.score}%
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      skill.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {skill.passed ? "Passed" : "Failed"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">You haven't completed any skill quizzes yet.</p>
            </div>
          )}
        </section>
      )}

      {activeTab === "learn" && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Skills I Can Learn</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Skill: {quiz.skillTag}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {quiz.questions.length} questions
                  </p>
                  <button
                    onClick={() => handleStartQuiz(quiz._id)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}