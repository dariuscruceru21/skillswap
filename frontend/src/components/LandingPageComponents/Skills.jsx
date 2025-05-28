import { useState } from "react";
import { BookOpen, Code, Music, Paintbrush, Languages, Dumbbell } from "lucide-react";

const iconMap = {
  book: BookOpen,
  code: Code,
  music: Music,
  art: Paintbrush,
  language: Languages,
  fitness: Dumbbell,
};

const popularSkills = [
  { name: "Guitar", category: "Music", icon: "music" },
  { name: "Web Development", category: "Tech", icon: "code" },
  { name: "Painting", category: "Art", icon: "art" },
];

const recentSkills = [
  { name: "Spanish", category: "Language", icon: "language" },
  { name: "Yoga", category: "Fitness", icon: "fitness" },
  { name: "Creative Writing", category: "Writing", icon: "book" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("popular");

  const skills = activeTab === "popular" ? popularSkills : recentSkills;

  return (
    <div id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Skills to Exchange</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse through thousands of skills people are offering
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab("popular")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              activeTab === "popular"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              activeTab === "recent"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Recently Added
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const LucideIcon = iconMap[skill.icon] || BookOpen;
          return (
            <div
              key={index}
              className="skill-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <LucideIcon className="text-indigo-600" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  <span className="text-sm text-gray-500">{skill.category}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Looking to exchange {skill.name.toLowerCase()} lessons for other valuable skills.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/43.jpg" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/34.jpg" alt="User" />
                </div>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300">
          Browse All Skills
        </button>
      </div>
    </div>
  );
}
