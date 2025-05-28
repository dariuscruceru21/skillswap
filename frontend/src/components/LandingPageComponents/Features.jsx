import { Handshake, Users, LineChart } from "lucide-react";

export default function Features() {
  return (
    <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SkillSwap Works</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A community built on mutual growth and shared knowledge
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Fair Exchange */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <Handshake className="text-indigo-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Fair Exchange</h3>
          <p className="text-gray-600">
            Trade your skills hour-for-hour with other members. No money changes hands, just knowledge.
          </p>
        </div>
        {/* Verified Community */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
            <Users className="text-pink-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Community</h3>
          <p className="text-gray-600">
            All members are verified to ensure a safe and trustworthy environment for skill sharing.
          </p>
        </div>
        {/* Track Progress */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <LineChart className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
          <p className="text-gray-600">
            Our system helps you track your skill exchanges and learning progress over time.
          </p>
        </div>
      </div>
    </div>
  );
}