export default function Hero() {
  return (
    <div className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Exchange Your Skills, Grow Together
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Teach what you know, learn what you don't. No money needed - just your time and willingness to share.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300">
                Get Started - It's Free
              </button>
              <button className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300">
                How It Works
              </button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="relative floating">
              <img
                src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                alt="People exchanging skills"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
