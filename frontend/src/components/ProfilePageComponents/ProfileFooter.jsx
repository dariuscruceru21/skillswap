import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">SkillSwap</h3>
            <p className="text-gray-300 text-sm">
              Connecting people through skill exchange since 2020. Trade what you know for what you want to learn.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Explore</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Messages</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-white text-sm">My Profile</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Safety Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white"><Facebook size={18} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><Twitter size={18} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><Instagram size={18} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><Linkedin size={18} /></a>
            </div>
            <p className="text-gray-300 text-sm">Subscribe to our newsletter for updates</p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="gradient-bg text-white px-3 py-2 text-sm rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; 2023 SkillSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}