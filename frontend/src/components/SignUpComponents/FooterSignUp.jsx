import { Repeat, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function FooterSignUp() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Repeat className="text-indigo-400 mr-2" size={20} />
            <span className="font-medium">SkillSwap</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; 2025 SkillSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}