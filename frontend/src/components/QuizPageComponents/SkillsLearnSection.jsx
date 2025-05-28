import React, { useState } from "react";

export default function SkillsLearnSection() {
  const [activeTab, setActiveTab] = useState("learn"); // "learn" or "current"

  // Dummy data for current skills
  const mySkills = [
    { name: "Programming", level: "Advanced" },
    { name: "Guitar", level: "Intermediate" },
    { name: "Spanish", level: "Beginner" },
  ];

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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {mySkills.map((skill, idx) => (
                <li
                  key={idx}
                  className="p-4 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </li>
              ))}
            </ul>
          </div>
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

          {/* Browse All Skills */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Browse All Skills
            </h3>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {/* Category 1 */}
                <div className="p-4 border-b border-r border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-3">Technical</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Programming
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Web Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Mobile Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Data Science
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Cybersecurity
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        UI/UX Design
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Cloud Computing
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Category 2 */}
                <div className="p-4 border-b border-r border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-3">Creative</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Photography
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Graphic Design
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Music
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Writing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Painting
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Video Editing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Animation
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Category 3 */}
                <div className="p-4 border-b border-r border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-3">Language</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Spanish
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        French
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Mandarin
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        German
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Japanese
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Italian
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Russian
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Category 4 */}
                <div className="p-4 border-b border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-3">Other</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Cooking
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Fitness
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Gardening
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        DIY Crafts
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Financial Planning
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Public Speaking
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600"
                      >
                        Chess
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}