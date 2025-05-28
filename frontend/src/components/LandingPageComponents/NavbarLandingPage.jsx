import { useState } from "react";
import { Repeat, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Repeat className="text-indigo-600 text-2xl mr-2" size={24} />
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a
              href="#features"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#skills"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Skills
            </a>
            <a
              href="#testimonials"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Testimonials
            </a>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link to="/signin">
              <button className="px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Up Free
              </button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#features"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50"
            >
              How It Works
            </a>
            <a
              href="#skills"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50"
            >
              Skills
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50"
            >
              Testimonials
            </a>
            <div className="mt-4 px-3">
              <Link to="/signup">
                <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign Up Free
                </button>
              </Link>
            </div>
            <div className="mt-2 px-3">
              <Link to="/signin">
                <button className="w-full px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
