import { Link } from "react-router-dom";

export default function NavbarSignUp() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <i className="fas fa-exchange-alt text-indigo-600 text-2xl mr-2" />
          <span className="text-xl font-bold text-gray-900">SkillSwap</span>
        </Link>
        <div className="flex items-center">
          <p className="text-gray-500 mr-4 hidden sm:block">Already have an account?</p>
          <Link to="/signin" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign In</Link>
        </div>
      </div>
    </nav>
  );
}
