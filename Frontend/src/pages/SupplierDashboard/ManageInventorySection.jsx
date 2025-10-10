import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';

export default function ManageInventorySection({ theme, inventory, searchTerm, setSearchTerm }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Manage Inventory</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
          />
        </div>
        <button className={`flex items-center px-4 py-2 border rounded-lg ${theme === 'light' ? 'border-gray-300 hover:bg-gray-50 text-gray-700' : 'border-gray-600 hover:bg-gray-700 text-gray-300'}`}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </button>
      </div>

      <div className={`rounded-lg shadow-sm border overflow-hidden ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Item</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Quantity</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Last Updated</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
            {inventory.map(item => (
              <tr key={item.id}>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.item}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.quantity} {item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{item.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}