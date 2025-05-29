import React, { useState } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';

const ListingsTable = ({ listings = [], onListingUpdate }) => {
  const [editingListing, setEditingListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: 'offer',
    archived: false
  });

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setFormData({
      name: listing.name,
      description: listing.description,
      category: listing.category,
      type: listing.type,
      archived: listing.archived
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/api/listings/${listingId}`);
        toast.success('Listing deleted successfully');
        onListingUpdate(); // Refresh the listings list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting listing');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingListing) {
        // Update existing listing
        await api.put(`/api/listings/${editingListing._id}`, formData);
        toast.success('Listing updated successfully');
        onListingUpdate(); // Refresh the listings list after update
      } else {
        // Create new listing
        await api.post('/api/listings', formData);
        toast.success('Listing created successfully');
        onListingUpdate(); // Refresh the listings list after create
      }
      setIsModalOpen(false);
      setEditingListing(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        type: 'offer',
        archived: false
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving listing');
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFeatured = async (listing) => {
    try {
      await api.patch(`/api/listings/${listing._id}`, { isFeatured: !listing.isFeatured });
      toast.success(`Listing ${listing.isFeatured ? 'removed from' : 'marked as'} featured`);
      onListingUpdate(); // Refresh the listings list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error toggling featured status');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Listings</h2>
        <button
          onClick={() => {
            setEditingListing(null);
            setFormData({
              name: '',
              description: '',
              category: '',
              type: 'offer',
              archived: false
            });
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Listing
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archived</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td className="px-6 py-4 whitespace-nowrap">{listing.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {listing.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{listing.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    listing.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {listing.archived ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => toggleFeatured(listing)}
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${listing.isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {listing.isFeatured ? 'Yes' : 'No'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fadeIn">
          <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {editingListing ? 'Edit Listing' : 'Add New Listing'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange(e, 'category')}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                      Type
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange(e, 'type')}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="offer">Offer</option>
                      <option value="request">Request</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    {editingListing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsTable;
