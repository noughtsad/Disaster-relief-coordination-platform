import React, { useState, useContext } from "react";
import { List, Truck, Package, CheckCircle, Calendar, MessageCircle } from 'lucide-react';
import ChatModal from '../../components/ChatModal';

export default function HomeSection({ theme, supplierProfile, orders: initialOrders, inventory }) {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [orders, setOrders] = useState(initialOrders);

  const openChatModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedRequestId(null);
  };
  return (
    <div className="space-y-8">
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
        Welcome, {supplierProfile.name}
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile.totalOrders}</p>
            </div>
            <List className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pending Deliveries</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile.pendingDeliveries}</p>
            </div>
            <Truck className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Inventory Items</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{inventory.length}</p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Supplier Rating</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile.rating}/5</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Recent Orders</h3>
        <div className="space-y-4">
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
              <div>
                <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{order.item} ({order.quantity})</p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>For: {order.ngo}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
                {order.chatEnabled && (
                  <button 
                    onClick={() => openChatModal(order.requestId)}
                    className="p-1 rounded-full text-indigo-600 hover:bg-indigo-100 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Low Stock Alerts</h3>
        <div className="space-y-4">
          {inventory.filter(item => item.status === 'Low Stock').map(item => (
            <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg border-l-4 border-red-500 ${theme === 'light' ? 'bg-red-50' : 'bg-red-900/20'}`}>
              <div>
                <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.item}</p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Quantity: {item.quantity} {item.unit}</p>
              </div>
              <span className="text-red-600 font-semibold">Urgent!</span>
            </div>
          ))}
          {inventory.filter(item => item.status === 'Low Stock').length === 0 && (
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No low stock items.</p>
          )}
        </div>
      </div>
      {selectedRequestId && (
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={closeChatModal}
          requestId={selectedRequestId}
          theme={theme} // Pass theme prop
        />
      )}
    </div>
  );
}