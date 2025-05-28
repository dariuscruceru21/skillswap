export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="fas fa-exchange-alt text-indigo-400 mr-2"></i>
            <span className="font-medium">SkillSwap</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; 2023 SkillSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
