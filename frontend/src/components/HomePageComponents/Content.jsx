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
} from "lucide-react";
import { useListingStore } from "../../stores/useListingStore";

// Map listing names to icons
const iconMap = {
  "Web Development": Laptop,
  "Guitar Lessons": Guitar,
  "French Tutoring": Languages,
  "Personal Training": Dumbbell,
  "Watercolor Painting": Paintbrush,
  "Auto Repair": Car,
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
  const { listings, loading, fetchFeaturedListings } = useListingStore();

  useEffect(() => {
    fetchFeaturedListings();
  }, [fetchFeaturedListings]);

  // Filter listings by search term (client-side)
  const filteredListings = listings.filter((listing) =>
    listing.name?.toLowerCase().includes(search.toLowerCase()) ||
    listing.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Featured Skill Exchanges</h1>
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
          </div>
        </div>
      </div>

      {/* Listings */}
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No listings found.</div>
          ) : (
            filteredListings.map((listing) => {
              const Icon = iconMap[listing.name] || Laptop;
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Featured
                      </span>
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
                        {/* You can display distance if you have it */}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-yellow-400">
                        {renderStars(listing.owner?.rating)}
                        <span className="text-gray-600 ml-1">{listing.owner?.rating ?? "N/A"}</span>
                      </div>
                      <button
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
    </main>
  );
}