import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className={`sidebar bg-indigo-800 text-white ${isCollapsed ? 'sidebar-collapsed' : 'w-64'} flex-shrink-0 flex flex-col transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        <div className="flex items-center">
          <i className="fas fa-exchange-alt text-white text-2xl mr-2"></i>
          <span className={`logo-text text-xl font-bold ${isCollapsed ? 'hidden' : ''}`}>SkillSwap Admin</span>
        </div>
        <button onClick={onToggle} className="text-white focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav className="p-4">
          <div className="mb-8">
            <p className={`nav-text text-xs uppercase text-indigo-400 font-semibold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Main</p>
            <ul>
              <li className="mb-2">
                <Link to="/admin" className={`nav-item flex items-center p-2 rounded-lg ${isActive('/admin') && !isActive('/admin/') ? 'bg-indigo-700' : 'hover:bg-indigo-700'} text-white`}>
                  <i className="fas fa-tachometer-alt mr-3"></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <p className={`nav-text text-xs uppercase text-indigo-400 font-semibold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Management</p>
            <ul>
              <li className="mb-2">
                <Link to="/admin/users" className={`nav-item flex items-center p-2 rounded-lg ${isActive('/admin/users') ? 'bg-indigo-700' : 'hover:bg-indigo-700'} text-white`}>
                  <i className="fas fa-users mr-3"></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Users</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/quizzes" className={`nav-item flex items-center p-2 rounded-lg ${isActive('/admin/quizzes') ? 'bg-indigo-700' : 'hover:bg-indigo-700'} text-white`}>
                  <i className="fas fa-question-circle mr-3"></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Quizzes</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/listings" className={`nav-item flex items-center p-2 rounded-lg ${isActive('/admin/listings') ? 'bg-indigo-700' : 'hover:bg-indigo-700'} text-white`}>
                  <i className="fas fa-list-alt mr-3"></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Listings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={`nav-text text-xs uppercase text-indigo-400 font-semibold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Settings</p>
            <ul>
              <li className="mb-2">
                <Link to="/admin/settings" className={`nav-item flex items-center p-2 rounded-lg ${isActive('/admin/settings') ? 'bg-indigo-700' : 'hover:bg-indigo-700'} text-white`}>
                  <i className="fas fa-cog mr-3"></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Settings</span>
                </Link>
              </li>
              <li className="mb-2">
                <button className="nav-item w-full flex items-center p-2 rounded-lg hover:bg-indigo-700 text-white">
                  <i className="fas fa-sign-out-alt mr-3"></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 