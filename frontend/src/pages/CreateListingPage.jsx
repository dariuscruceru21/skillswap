import React from 'react';
import CreateListingForm from '../components/ExplorePageComponents/CreateListingForm';

const CreateListingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create a New Listing</h1>
          <p className="mt-2 text-sm text-gray-600">
            Share your skills or find what you're looking for
          </p>
        </div>
        <CreateListingForm />
      </div>
    </div>
  );
};

export default CreateListingPage; 