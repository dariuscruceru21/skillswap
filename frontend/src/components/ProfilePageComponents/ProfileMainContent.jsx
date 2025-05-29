import {
  MapPin,
  Share2,
  Pencil,
  Star,
  Repeat,
  Clock,
  Briefcase,
  GraduationCap,
  Languages,
  Heart,
  Laptop,
  Guitar,
  Mail,
  Phone,
  Linkedin,
  Github,
  Calendar,
  CheckCircle,
  IdCard,
  StarHalf
} from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useUserStore } from "../../stores/useUserStore";
import axios from 'axios';
import toast from 'react-hot-toast';

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ProfileMainContent({ activeTab }) {
  const { user, fetchProfile } = useUserStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [editFormData, setEditFormData] = useState({
    occupation: '',
    education: '',
    languages: [],
    interests: [],
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (user) {
      setEditFormData({
        occupation: user.occupation || '',
        education: user.education || '',
        languages: user.languages || [],
        interests: user.interests || [],
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    if (user) {
      setEditFormData({
        occupation: user.occupation || '',
        education: user.education || '',
        languages: user.languages || [],
        interests: user.interests || [],
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditArrayInputChange = (e, fieldName) => {
    const value = e.target.value;
    setEditFormData((prev) => ({
      ...prev,
      [fieldName]: value.split(',').map(item => item.trim()).filter(item => item !== ''),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/auth/users/${user._id}`, editFormData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      toast.success('Profile updated successfully');
      setIsEditModalOpen(false);
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  };

  const acquiredSkills = user.passedQuizzes?.map(submission => ({
    name: submission.quiz?.skillTag,
    score: submission.score,
    passed: submission.passed,
  })).filter(skill => skill.name) || [];

  // Function to get random skills
  const getRandomSkills = (skills, count) => {
    const shuffled = [...skills].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const displayedSkills = showAllSkills ? acquiredSkills : getRandomSkills(acquiredSkills, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="gradient-bg h-32 md:h-48"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex items-end -mt-16 md:-mt-20">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center">
                <div className="h-28 w-28 md:h-36 md:w-36 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 text-4xl md:text-5xl font-bold">
                  {getInitials(user.name)}
                </div>
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.name}</h1>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.skillTags?.map((tag) => (
                    <span key={tag} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
                <Share2 className="mr-2" size={16} /> Share Profile
              </button>
              <button
                onClick={handleEditButtonClick}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
              >
                <Pencil className="mr-2" size={16} /> Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span className="text-sm font-medium">{user.rating ?? "N/A"} ({user.reviews?.length ?? 0} reviews)</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Repeat className="text-indigo-500 mr-1" size={16} />
              <span className="text-sm font-medium">
                {user.exchangesCompleted ?? 0} exchanges completed
              </span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Clock className="text-indigo-500 mr-1" size={16} />
              <span className="text-sm font-medium">
                Member since {user.createdAt ? new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button className="tab-active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-indigo-600 border-indigo-600">About</button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Skills Offered</button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Skills Wanted</button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Reviews</button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Activity</button>
        </nav>
      </div>

      {/* Tabs content */}
      {activeTab === "About" && (
        <>
          {/* About Me section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio Section */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">About Me</h2>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                      <Briefcase size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Occupation</h3>
                      <p className="text-sm text-gray-500">{user.occupation ?? "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                      <GraduationCap size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Education</h3>
                      <p className="text-sm text-gray-500">{user.education ?? "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                      <Languages size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Languages</h3>
                      <p className="text-sm text-gray-500">{(user.languages ?? []).join(", ") || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                      <Heart size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Interests</h3>
                      <p className="text-sm text-gray-500">{(user.interests ?? []).join(", ") || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Skills - Now showing skills from passed quizzes */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Acquired Skills (from Quizzes)</h2>
                  {acquiredSkills.length > 3 && (
                    <button
                      onClick={() => setShowAllSkills(!showAllSkills)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {showAllSkills ? "Show Random 3" : `See all (${acquiredSkills.length})`}
                    </button>
                  )}
                </div>

                {acquiredSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedSkills.map((skill, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800">
                            <Laptop size={20} />
                          </div>
                          <h3 className="ml-3 font-medium text-gray-900">{skill.name}</h3>
                        </div>
                        <p className={`px-2 py-1 text-xs font-semibold rounded-full inline-block ${
                          skill.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {skill.passed ? "Passed" : "Failed"} (Score: {skill.score}%)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : ( 
                  <div className="text-gray-400 text-center">No skills acquired from quizzes yet.</div>
                )}
              </div>

              {/* Recent Reviews */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
                </div>
                <div className="space-y-4">
                  {(user.reviews ?? []).length > 0 ? (
                    (user.reviews ?? []).map((review, idx) => {
                      const stars = Number(review.stars) || 0;
                      const fullStars = Math.floor(stars);
                      const halfStar = stars % 1 >= 0.5;
                      const reviewerName = review.reviewerId?.name || "User";
                      const reviewComment = review.comment || "No comment provided.";
                      return (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4 transition-all duration-300 review-card">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                                {getInitials(reviewerName)}
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="flex items-center">
                                <h3 className="text-sm font-medium text-gray-900">{reviewerName}</h3>
                                <span className="ml-2 text-xs text-gray-500">
                                  {review.date ? new Date(review.date).toLocaleDateString() : ""}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center text-yellow-400">
                                  {[...Array(fullStars)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                                  ))}
                                  {halfStar && <StarHalf size={16} fill="currentColor" stroke="none" />}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-900">{stars}</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">{reviewComment}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-center">No reviews yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="text-gray-500 mr-3" size={18} />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center">
                      <Phone className="text-gray-500 mr-3" size={18} />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                  )}
                  {user.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="text-gray-500 mr-3" size={18} />
                      <a href={user.linkedin} className="text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">{user.linkedin}</a>
                    </div>
                  )}
                  {user.github && (
                    <div className="flex items-center">
                      <Github className="text-gray-500 mr-3" size={18} />
                      <a href={user.github} className="text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">{user.github}</a>
                    </div>
                  )}
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
                  <Mail className="mr-2" size={16} /> Send Message
                </button>
              </div>

              {/* Availability */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Availability</h2>
                <div className="space-y-2">
                  {(user.availability ?? []).map((slot, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${slot.available ? "bg-green-500" : "bg-gray-300"}`}></div>
                      <span className={`text-gray-600 ${!slot.available ? "text-gray-400" : ""}`}>{slot.day}: {slot.time}</span>
                    </div>
                  ))}
                  {(user.availability?.length ?? 0) === 0 && (
                    <div className="text-gray-400">No availability set.</div>
                  )}
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
                  <Calendar className="mr-2" size={16} /> Request Different Time
                </button>
              </div>

              {/* Verification Badges */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Verification</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle size={18} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Email Verified</h3>
                      <p className="text-xs text-gray-500">{user.emailVerified ? `Verified on ${user.emailVerified}` : "Not verified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle size={18} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Phone Verified</h3>
                      <p className="text-xs text-gray-500">{user.phoneVerified ? `Verified on ${user.phoneVerified}` : "Not verified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <IdCard size={18} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">ID Verified</h3>
                      <p className="text-xs text-gray-500">{user.idVerified ? "Government ID on file" : "Not verified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab === "Skills Offered" && (
        <>
          {/* Skills Offered section */}
        </>
      )}
      {activeTab === "Skills Wanted" && (
        <>
          {/* Skills Wanted section */}
        </>
      )}
      {activeTab === "Reviews" && (
        <>
          {/* Reviews section */}
        </>
      )}
      {activeTab === "Activity" && (
        <>
          {/* Activity section */}
        </>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex justify-center items-center animate-fadeIn">
          <div className="relative p-6 border w-[500px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Edit Profile</h3>
              <button
                onClick={handleEditModalClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="occupation">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={editFormData.occupation}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="education">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={editFormData.education}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="languages">
                  Languages (comma-separated)
                </label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value={editFormData.languages.join(', ')}
                  onChange={(e) => handleEditArrayInputChange(e, 'languages')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="interests">
                  Interests (comma-separated)
                </label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={editFormData.interests.join(', ')}
                  onChange={(e) => handleEditArrayInputChange(e, 'interests')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleEditModalClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}