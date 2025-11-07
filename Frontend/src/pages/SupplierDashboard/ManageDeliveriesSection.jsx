import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Truck, MapPin, Package, Calendar, CheckCircle2, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import ChatModal from '../../components/ChatModal';

export default function ManageDeliveriesSection({ theme }) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'past'
  const [deliveries, setDeliveries] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    fetchDeliveries();
    fetchPastOrders();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fulfillment/my-fulfillments`, {
        params: { status: 'Dispatched' },
        withCredentials: true,
      });
      setDeliveries(response.data.fulfillments || []);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPastOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fulfillment/my-fulfillments`, {
        params: { status: 'Delivered' },
        withCredentials: true,
      });
      setPastOrders(response.data.fulfillments || []);
    } catch (error) {
      console.error('Error fetching past orders:', error);
    }
  };

  const handleUpdateStatus = async (fulfillmentId) => {
    const confirmed = window.confirm('Mark this delivery as completed?');
    if (!confirmed) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/delivered/${fulfillmentId}`,
        {},
        { withCredentials: true }
      );
      alert('Delivery marked as completed successfully!');
      fetchDeliveries();
    } catch (error) {
      console.error('Error updating delivery status:', error);
      alert(error.response?.data?.message || 'Error updating delivery status');
    }
  };

  const handleOpenChat = (delivery) => {
    setSelectedRequestId(delivery.survivorRequest?._id || delivery.survivorRequest);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedRequestId(null);
  };

  const handleMarkComplete = async (requestId) => {
    const confirmed = window.confirm('Mark this request as complete? This action cannot be undone.');
    if (!confirmed) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/request/complete/${requestId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert(response.data.message || 'Request marked as complete successfully. Awaiting volunteer verification.');
      fetchDeliveries(); // Refresh the list of deliveries to update the status
      fetchPastOrders();
    } catch (err) {
      console.error('Mark complete error:', err);
      alert(err.response?.data?.message || 'Failed to mark request as complete');
    }
  };

  const currentOrders = activeTab === 'active' ? deliveries : pastOrders;

  const filteredDeliveries = currentOrders.filter(delivery => {
    const matchesSearch = 
      delivery._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.ngo?.ngoName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.inventoryItem?.itemName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading deliveries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Manage Deliveries
        </h2>
        <div className={`px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-blue-50 text-blue-700' : 'bg-blue-900/30 text-blue-300'}`}>
          <Truck className="inline-block w-5 h-5 mr-2" />
          {activeTab === 'active' ? deliveries.length : pastOrders.length} {activeTab === 'active' ? 'Active' : 'Completed'} Deliveries
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${
            activeTab === 'active' 
              ? 'border-b-2 border-blue-500 text-blue-500' 
              : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Clock size={18} />
          Active Deliveries ({deliveries.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${
            activeTab === 'past' 
              ? 'border-b-2 border-blue-500 text-blue-500' 
              : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <CheckCircle2 size={18} />
          Past Orders ({pastOrders.length})
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search by order ID, NGO, or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
          />
        </div>
      </div>

      {filteredDeliveries.length === 0 ? (
        <div className={`text-center py-12 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          {activeTab === 'active' ? (
            <>
              <Truck className={`mx-auto h-12 w-12 mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`} />
              <p className={`text-lg font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                No Active Deliveries
              </p>
              <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Dispatched orders will appear here
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className={`mx-auto h-12 w-12 mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`} />
              <p className={`text-lg font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                No Past Orders
              </p>
              <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Completed deliveries will appear here
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery._id}
              className={`p-6 rounded-lg shadow-sm border ${
                theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {delivery.inventoryItem?.itemName || 'Unknown Item'}
                    </h3>
                  </div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Order ID: {delivery._id.slice(-8)}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  In Transit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-xs font-medium mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    NGO / Destination
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {delivery.ngo?.ngoName || 'Unknown NGO'}
                      </p>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {delivery.ngo?.ngoContact || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className={`text-xs font-medium mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Quantity
                  </p>
                  <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {delivery.fulfilledQuantity || delivery.requestedQuantity} {delivery.inventoryItem?.unit || 'units'}
                  </p>
                </div>
              </div>

              {delivery.dispatchDetails && (
                <div className={`mb-4 p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {delivery.dispatchDetails.trackingInfo && (
                      <div>
                        <p className={`text-xs font-medium mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          Tracking Info
                        </p>
                        <p className={`text-sm font-mono ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {delivery.dispatchDetails.trackingInfo}
                        </p>
                      </div>
                    )}
                    {delivery.dispatchDetails.dispatchedAt && (
                      <div>
                        <p className={`text-xs font-medium mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          Dispatched On
                        </p>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {new Date(delivery.dispatchDetails.dispatchedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {delivery.dispatchDetails.expectedDelivery && (
                      <div>
                        <p className={`text-xs font-medium mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          Expected Delivery
                        </p>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {new Date(delivery.dispatchDetails.expectedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'active' ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStatus(delivery._id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      Mark as Delivered
                    </button>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${delivery.ngo?.ngoLatitude},${delivery.ngo?.ngoLongitude}`, '_blank')}
                      className={`flex-1 px-4 py-2 border rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        theme === 'light' 
                          ? 'border-gray-300 hover:bg-gray-50 text-gray-700' 
                          : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      View Route
                    </button>
                  </div>
                  {/* Mark as Complete button for Supplier (if main request is Delivered) */}
                  {delivery.survivorRequest?.status === 'Delivered' && user.userType === 'Supplier' && (
                    <button
                      onClick={() => handleMarkComplete(delivery.survivorRequest._id)}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Request Complete
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-green-50 border border-green-200' : 'bg-green-900/20 border border-green-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p className={`font-medium ${theme === 'light' ? 'text-green-800' : 'text-green-300'}`}>
                        Delivered Successfully
                      </p>
                    </div>
                    {delivery.deliveryDetails?.deliveredAt && (
                      <p className={`text-sm ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>
                        Completed on {new Date(delivery.deliveryDetails.deliveredAt).toLocaleDateString()}
                      </p>
                    )}
                    {delivery.rating && (
                      <div className="mt-2 flex items-center gap-1">
                        <span className={`text-sm ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>Rating:</span>
                        <span className="text-yellow-500">{'⭐'.repeat(delivery.rating)}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleOpenChat(delivery)}
                    className={`w-full px-4 py-2 border rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      theme === 'light' 
                        ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50' 
                        : 'border-indigo-400 text-indigo-400 hover:bg-indigo-900/30'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    View Chat History
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Chat Modal */}
      {selectedRequestId && isChatOpen && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          requestId={selectedRequestId}
          theme={theme}
        />
      )}
    </div>
  );
}