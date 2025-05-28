export default function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How SkillSwap Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just a few simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Profile</h3>
            <p className="text-gray-600">List the skills you can teach and what you want to learn.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Matches</h3>
            <p className="text-gray-600">Browse or search for people with matching skills.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect & Agree</h3>
            <p className="text-gray-600">Message potential partners and agree on exchange terms.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">4</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn & Teach</h3>
            <p className="text-gray-600">Meet (in person or online) and exchange your skills!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
