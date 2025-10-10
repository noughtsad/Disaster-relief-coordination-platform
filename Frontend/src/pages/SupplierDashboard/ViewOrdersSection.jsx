import React from 'react';
import { Search, Filter, Calendar, Truck } from 'lucide-react';

export default function ViewOrdersSection({ theme, orders, searchTerm, setSearchTerm }) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>View Orders</h2>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search orders..."
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map(order => (
          <div key={order.id} className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{order.item} ({order.quantity})</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Ordered by: {order.ngo}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Calendar className="mr-2 h-4 w-4" />
                Order Date: {order.date}
              </div>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Truck className="mr-2 h-4 w-4" />
                Delivery Date: {order.deliveryDate}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}