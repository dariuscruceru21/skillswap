import { useEffect, useState } from "react";
import {
  Search,
  Laptop,
  Guitar,
  Languages,
  Dumbbell,
  Paintbrush,
  Car,
  Star,
  StarHalf,
  Star as StarOutline,
  AlertCircle,
  Code,
  Music,
  BookOpen,
  Camera,
  ChefHat,
  Palette,
  PenTool,
  Briefcase,
  Heart,
  Leaf,
  Lightbulb,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  Plane,
  ShoppingBag,
  Video,
  Wrench,
  Upload,
} from "lucide-react";
import { useListingStore } from "../../stores/useListingStore";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


// Map listing categories to icons
const iconMap = {
  "Web Development": Code,
  "Programming": Code,
  "Software Development": Code,
  "Music": Music,
  "Guitar": Guitar,
  "Piano": Music,
  "Language": Languages,
  "Tutoring": BookOpen,
  "Photography": Camera,
  "Cooking": ChefHat,
  "Art": Palette,
  "Design": PenTool,
  "Business": Briefcase,
  "Health": Heart,
  "Fitness": Dumbbell,
  "Environment": Leaf,
  "Education": BookOpen,
  "Communication": MessageSquare,
  "Public Speaking": Mic,
  "Technology": Monitor,
  "Mobile Development": Phone,
  "Travel": Plane,
  "Marketing": ShoppingBag,
  "Video Production": Video,
  "Repair": Wrench,
  "Automotive": Car,
  "Writing": PenTool,
  "Creative": Palette,
  "Professional": Briefcase,
  "Personal Development": Lightbulb,
};

function renderStars(rating) {
  if (!rating) return null;
  const stars = [];
  let r = Math.floor(rating);
  for (let i = 0; i < 5; i++) {
    if (i < r) {
      stars.push(<Star key={i} fill="currentColor" stroke="none" size={18} />);
    } else if (i === r && rating % 1 >= 0.5) {
      stars.push(<StarHalf key={i} fill="currentColor" stroke="none" size={18} />);
    } else {
      stars.push(<StarOutline key={i} className="opacity-40" size={18} />);
    }
  }
  return stars;
}

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Content() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showMatchingSkills, setShowMatchingSkills] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: 'offer',
    image: ''
  });
  const { listings, loading, error, fetchAllListingsForExplore, createListing } = useListingStore();
  const { user } = useUserStore();
  const navigate = useNavigate();


  useEffect(() => {
    fetchAllListingsForExplore();
  }, [fetchAllListingsForExplore]);

  // Get unique categories from listings
  const categories = [...new Set(listings.map(listing => listing.category))].sort();

  // Filter listings by search term and category
  const filteredListings = listings?.filter((listing) => {
    const matchesSearch = listing.name?.toLowerCase().includes(search.toLowerCase()) ||
      listing.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Get matching listings based on user's skills from passed quizzes
  const matchingListings = listings?.filter((listing) => {
    if (!user?.passedQuizzes || user.passedQuizzes.length === 0) return false;
    
    // Get unique skill tags from passed quizzes
    const userSkills = [...new Set(user.passedQuizzes.map(quiz => quiz.quiz.skillTag))];
    
    return userSkills.some(skill => 
      listing.tags?.includes(skill.toLowerCase()) || 
      listing.category.toLowerCase() === skill.toLowerCase()
    );
  }) || [];

  const handleConnect = async (listing) => {
    try {
      // Navigate to messages page with the listing owner's ID
      navigate(`/messages?userId=${listing.owner._id}`);
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      await createListing(formData);
      toast.success('Listing created successfully');
      setIsCreateModalOpen(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        type: 'offer',
        image: ''
      });
      fetchAllListingsForExplore(); // Refresh listings
    } catch (error) {
      toast.error(error.message || 'Error creating listing');
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">All Skill Exchanges</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative rounded-md shadow-sm flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-2 border-gray-300 rounded-md"
                placeholder="Search skills..."
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
           
          </div>
        </div>
      </div>

      {/* Matching Skills Section */}
      {user?.skillTags && user.skillTags.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Matching Your Skills</h2>
            <button
              onClick={() => setShowMatchingSkills(!showMatchingSkills)}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {showMatchingSkills ? 'Hide' : 'Show'} Matching Skills
            </button>
          </div>
          {showMatchingSkills && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingListings.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No listings match your skills yet.
                </div>
              ) : (
                matchingListings.map((listing) => {
                  const Icon = iconMap[listing.category] || Laptop;
                  return (
                    <div
                      key={listing._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover"
                    >
                      <div className="gradient-bg h-40 flex items-center justify-center">
                        <Icon className="text-white" size={48} />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
                          {listing.isFeatured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{listing.description}</p>
                        <div className="flex items-center mb-4">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                              {getInitials(listing.owner?.name)}
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{listing.owner?.name}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-yellow-400">
                            {renderStars(listing.owner?.rating)}
                            <span className="text-gray-600 ml-1">{listing.owner?.rating ?? "N/A"}</span>
                          </div>
                          <button
                            onClick={() => handleConnect(listing)}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* All Listings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">All Listings</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Listing
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                {search ? "No listings match your search." : "No listings available."}
              </div>
            ) : (
              filteredListings.map((listing) => {
                const Icon = iconMap[listing.category] || Laptop;
                return (
                  <div
                    key={listing._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 card-hover"
                  >
                    <div className="gradient-bg h-40 flex items-center justify-center">
                      <Icon className="text-white" size={48} />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
                        {listing.isFeatured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{listing.description}</p>
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                            {getInitials(listing.owner?.name)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{listing.owner?.name}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-yellow-400">
                          {renderStars(listing.owner?.rating)}
                          <span className="text-gray-600 ml-1">{listing.owner?.rating ?? "N/A"}</span>
                        </div>
                        <button
                          onClick={() => handleConnect(listing)}
                          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fadeIn">
          <div className="relative top-20 mx-auto p-6 border w-[800px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Create New Listing</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleCreateListing} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange(e, 'category')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, 'description')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange(e, 'type')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                >
                  <option value="offer">I'm Offering</option>
                  <option value="request">I'm Looking For</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleInputChange(e, 'image')}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listing Details Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fadeIn">
          <div className="relative top-20 mx-auto p-6 border w-[600px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Listing Details</h3>
              <button
                onClick={() => setSelectedListing(null)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p className="mt-1 text-lg text-gray-900">{selectedListing.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="mt-1 text-lg text-gray-900">{selectedListing.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="mt-1 text-lg text-gray-900">{selectedListing.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Owner Details</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-lg text-gray-900">Name: {selectedListing.owner?.name}</p>
                  <p className="text-lg text-gray-900">Email: {selectedListing.owner?.email}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}