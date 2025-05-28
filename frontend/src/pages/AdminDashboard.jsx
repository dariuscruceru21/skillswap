import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/AdminDashboardComponents/Sidebar';
import Header from '../components/AdminDashboardComponents/Header';
import NavbarHomePager from '../components/HomePageComponents/NavbarHomePage';
import UsersTable from '../components/AdminDashboardComponents/UsersTable';
import QuizzesTable from '../components/AdminDashboardComponents/QuizzesTable';
import ListingsTable from '../components/AdminDashboardComponents/ListingsTable';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState({
    users: false,
    quizzes: false,
    listings: false
  });
  const [error, setError] = useState({
    users: null,
    quizzes: null,
    listings: null
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      setError(prev => ({ ...prev, users: null }));
      const response = await axios.get('/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setUsers(response.data || []);
    } catch (err) {
      setError(prev => ({ ...prev, users: err.response?.data?.message || 'Error fetching users' }));
      console.error('Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  // Fetch quizzes
  const fetchQuizzes = async () => {
    try {
      setLoading(prev => ({ ...prev, quizzes: true }));
      setError(prev => ({ ...prev, quizzes: null }));
      const response = await axios.get('/api/quiz', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setQuizzes(response.data || []);
    } catch (err) {
      setError(prev => ({ ...prev, quizzes: err.response?.data?.message || 'Error fetching quizzes' }));
      console.error('Error fetching quizzes:', err);
      setQuizzes([]);
    } finally {
      setLoading(prev => ({ ...prev, quizzes: false }));
    }
  };

  // Fetch listings
  const fetchListings = async () => {
    try {
      setLoading(prev => ({ ...prev, listings: true }));
      setError(prev => ({ ...prev, listings: null }));
      const response = await axios.get('/api/listings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setListings(response.data?.listings || []);
    } catch (err) {
      setError(prev => ({ ...prev, listings: err.response?.data?.message || 'Error fetching listings' }));
      console.error('Error fetching listings:', err);
      setListings([]);
    } finally {
      setLoading(prev => ({ ...prev, listings: false }));
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchQuizzes();
    fetchListings();
  }, []);

  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('/quizzes')) return 'Quizzes Management';
    if (path.includes('/listings')) return 'Listings Management';
    if (path.includes('/settings')) return 'Settings';
    return 'Users Management';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarHomePager/>
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="/users" element={
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                </div>
                {error.users && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error.users}
                  </div>
                )}
                {loading.users ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <UsersTable 
                    users={users}
                    onUserUpdate={fetchUsers}
                  />
                )}
              </div>
            } />
            <Route path="/quizzes" element={
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">All Quizzes</h2>
                </div>
                {error.quizzes && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error.quizzes}
                  </div>
                )}
                {loading.quizzes ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <QuizzesTable 
                    key={quizzes.length}
                    quizzes={quizzes}
                    onQuizUpdate={fetchQuizzes}
                  />
                )}
              </div>
            } />
            <Route path="/listings" element={
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">All Listings</h2>
                </div>
                {error.listings && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error.listings}
                  </div>
                )}
                {loading.listings ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <ListingsTable
                    key={listings.length}
                    listings={listings}
                    onListingUpdate={fetchListings}
                  />
                )}
              </div>
            } />
            <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 