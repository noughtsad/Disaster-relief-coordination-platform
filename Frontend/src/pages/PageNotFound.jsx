import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800">404</h1>
      <p className="text-xl sm:text-2xl font-light text-gray-600 mb-6 sm:mb-8 text-center">Page Not Found</p>
      <Link to="/" className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base">
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
