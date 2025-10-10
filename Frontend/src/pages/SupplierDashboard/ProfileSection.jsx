import React from 'react';
import { Edit } from 'lucide-react';

export default function ProfileSection({ theme, supplierProfile }) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Supplier Profile</h2>
      
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company Information</h3>
          <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Company Name</label>
            <input
              type="text"
              value={supplierProfile.name}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Email</label>
            <input
              type="email"
              value={supplierProfile.email}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Phone</label>
            <input
              type="tel"
              value={supplierProfile.phone}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Rating</label>
            <input
              type="text"
              value={`${supplierProfile.rating}/5`}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Address</label>
          <textarea
            value={supplierProfile.address}
            rows="2"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
            readOnly
          />
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Products Supplied</label>
          <div className="flex flex-wrap gap-2">
            {supplierProfile.products.map((product, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {product}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}