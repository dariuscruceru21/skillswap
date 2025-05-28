import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail("");
    // Optionally, send the email to your backend here
  };

  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-6">
              Subscribe to our newsletter for tips on skill exchange, success stories, and community updates.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {isSubmitted && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
                Thanks for subscribing! We'll be in touch soon.
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="relative">
                <img
                  src="https://illustrations.popsy.co/amber/email.svg"
                  alt="Newsletter"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
