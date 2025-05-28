import { Repeat } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarLogin() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Repeat className="fas fa-exchange-alt text-indigo-600 text-2xl mr-2"/>
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </Link>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500 mr-4 hidden sm:block">Don't have an account?</p>
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
