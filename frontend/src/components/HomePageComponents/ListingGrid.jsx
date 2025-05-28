import { Laptop, Guitar, Languages, Dumbbell, Paintbrush, Car, Star, StarHalf, Star as StarOutline } from "lucide-react";

// Map categories to icons
const iconMap = {
  "Web Development": Laptop,
  "Guitar Lessons": Guitar,
  "French Tutoring": Languages,
  "Personal Training": Dumbbell,
  "Watercolor Painting": Paintbrush,
  "Auto Repair": Car,
};

function renderStars(rating) {
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

export default function ListingGrid({ listings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => {
        const Icon = iconMap[listing.title] || Laptop;
        const statusColor =
          listing.status === "Available"
            ? "bg-green-100 text-green-800"
            : listing.status === "Limited"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800";
        const isAvailable = listing.status === "Available" || listing.status === "Limited";
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
                <h3 className="text-lg font-bold text-gray-900">{listing.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                  {listing.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{listing.description}</p>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                    {listing.ownerInitials}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{listing.ownerName}</p>
                  <p className="text-sm text-gray-500">{listing.distance} miles away</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-yellow-400">
                  {renderStars(listing.rating)}
                  <span className="text-gray-600 ml-1">{listing.rating}</span>
                </div>
                <button
                  className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    isAvailable
                      ? "gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isAvailable}
                >
                  {isAvailable ? "Connect" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}