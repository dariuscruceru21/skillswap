import React, { useState } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';

const QuizzesTable = ({ quizzes = [], onQuizUpdate }) => {
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    skillTag: '',
    questions: [{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]
  });
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      skillTag: quiz.skillTag,
      questions: quiz.questions.map(q => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex
      }))
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await api.delete(`/api/quiz/${quizId}`);
        toast.success('Quiz deleted successfully');
        onQuizUpdate(); // Refresh the quizzes list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting quiz');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuiz) {
        // Update existing quiz
        await api.put(`/api/quiz/${editingQuiz._id}`, formData);
        toast.success('Quiz updated successfully');
      } else {
        // Create new quiz
        await api.post('/api/quiz', formData);
        toast.success('Quiz created successfully');
      }
      setIsModalOpen(false);
      setEditingQuiz(null);
      setFormData({
        title: '',
        skillTag: '',
        questions: [{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]
      });
      onQuizUpdate(); // Refresh the quizzes list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving quiz');
    }
  };

  const handleInputChange = (e, questionIndex, field) => {
    const { value } = e.target;
    if (questionIndex === undefined) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.map((q, idx) =>
          idx === questionIndex ? { ...q, [field]: value } : q
        )
      }));
    }
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === questionIndex ? {
          ...q,
          options: q.options.map((opt, optIdx) =>
            optIdx === optionIndex ? value : opt
          )
        } : q
      )
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]
    }));
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Quizzes</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingQuiz(null);
              setFormData({
                title: '',
                skillTag: '',
                questions: [{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]
              });
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Quiz
          </button>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Generate Quiz with AI
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {quiz.skillTag}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{quiz.questions?.length || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fadeIn">
          <div className="relative top-20 mx-auto p-6 border w-[800px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                {editingQuiz ? 'Edit Quiz' : 'Add New Quiz'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, undefined, 'title')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="skillTag">
                    Skill Tag
                  </label>
                  <input
                    type="text"
                    id="skillTag"
                    value={formData.skillTag}
                    onChange={(e) => handleInputChange(e, undefined, 'skillTag')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Questions</label>
                <div className="space-y-4">
                  {formData.questions.map((question, qIndex) => (
                    <div key={qIndex} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <label className="font-medium text-gray-700">Question {qIndex + 1}</label>
                        {formData.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={question.questionText}
                        onChange={(e) => handleInputChange(e, qIndex, 'questionText')}
                        placeholder="Enter question text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        required
                      />
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name={`q${qIndex}`}
                              checked={question.correctAnswerIndex === oIndex}
                              onChange={() => handleInputChange({ target: { value: oIndex } }, qIndex, 'correctAnswerIndex')}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              placeholder={`Option ${oIndex + 1}`}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i> Add Question
                </button>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  {editingQuiz ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <GenerateQuizModal
        open={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onQuizCreated={onQuizUpdate}
      />
    </div>
  );
};


function GenerateQuizModal({ open, onClose, onQuizCreated }) {
  const [title, setTitle] = useState("");
  const [skillTag, setSkillTag] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/quiz/generate-ai", {
        title,
        skillTag,
        numQuestions,
      });
      onQuizCreated(res.data); // Refresh the quiz list
      onClose();
    } catch (err) {
      toast.error("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fadeIn flex items-center justify-center">
      <div className="relative top-20 mx-auto p-6 border w-[500px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Generate Quiz with AI</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Quiz Title" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Tag</label>
            <input value={skillTag} onChange={e => setSkillTag(e.target.value)} placeholder="Skill Tag" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
            <input type="number" value={numQuestions} onChange={e => setNumQuestions(e.target.value)} min={1} max={20} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors" disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizzesTable; 