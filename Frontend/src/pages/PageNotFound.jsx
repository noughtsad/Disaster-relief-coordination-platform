import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800">404</h1>
      <p className="text-xl sm:text-2xl font-light text-gray-600 mb-6 sm:mb-8 text-center">Page Not Found</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <Link to="/" className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
