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
import { useUserStore } from "../../stores/useUserStore";
import { useEffect } from "react";

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

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
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
              <span className="text-sm font-medium">{user.exchangesCompleted ?? 0} exchanges completed</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Clock className="text-indigo-500 mr-1" size={16} />
              <span className="text-sm font-medium">
                Member since {user.memberSince ? new Date(user.memberSince).toLocaleString('default', { month: 'long', year: 'numeric' }) : "N/A"}
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
                <p className="text-gray-600 mb-4">
                  {user.bio ?? "No bio provided yet."}
                </p>
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
                      <p className="text-sm text-gray-500">{user.languages?.join(", ") ?? "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                      <Heart size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Interests</h3>
                      <p className="text-sm text-gray-500">{user.interests?.join(", ") ?? "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Skills */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Featured Skills</h2>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">See all</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(user.featuredSkills ?? []).map((skill, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800">
                          {skill.icon === "guitar" ? <Guitar size={20} /> : <Laptop size={20} />}
                        </div>
                        <h3 className="ml-3 font-medium text-gray-900">{skill.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{skill.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(skill.tags ?? []).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">See all</button>
                </div>
                <div className="space-y-4">
                  {(user.reviews ?? []).map((review, idx) => {
                    // Safely get stars as a number, default to 0
                    const stars = Number(review.stars) || 0;
                    const fullStars = Math.floor(stars);
                    const halfStar = stars % 1 >= 0.5;
                    // Use populated reviewer name if available, fallback to "User"
                    const reviewerName = review.reviewerId?.name || "User";
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
                            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {(user.reviews?.length ?? 0) === 0 && (
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
    </main>
  );
}