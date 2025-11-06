import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Truck, CheckCircle, XCircle, MapPin, User, Package, X, MessageCircle } from 'lucide-react';
import axios from 'axios';
import ChatModal from '../../components/ChatModal';

export default function ViewOrdersSection({ theme }) {
  const [fulfillments, setFulfillments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [selectedFulfillment, setSelectedFulfillment] = useState(null);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [dispatchData, setDispatchData] = useState({
    trackingInfo: '',
    expectedDeliveryHours: '',
  });

  useEffect(() => {
    fetchFulfillments();
  }, []);

  const fetchFulfillments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fulfillment/my-fulfillments`, {
        withCredentials: true,
      });
      setFulfillments(response.data.fulfillments);
    } catch (error) {
      console.error('Error fetching fulfillments:', error);
    }
  };

  const handleAccept = async (fulfillmentId) => {
    const quantityInput = window.prompt('Enter quantity to fulfill (or leave empty to fulfill full amount):');
    const fulfilledQuantity = quantityInput ? parseInt(quantityInput) : null;

    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/accept/${fulfillmentId}`,
        { fulfilledQuantity },
        { withCredentials: true }
      );
      await fetchFulfillments();
      alert('Fulfillment request accepted successfully!');
    } catch (error) {
      console.error('Error accepting fulfillment:', error);
      alert(error.response?.data?.message || 'Error accepting fulfillment');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (fulfillmentId) => {
    const reason = window.prompt('Enter rejection reason:');
    if (!reason) return;

    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/reject/${fulfillmentId}`,
        { rejectionReason: reason },
        { withCredentials: true }
      );
      await fetchFulfillments();
      alert('Fulfillment request rejected');
    } catch (error) {
      console.error('Error rejecting fulfillment:', error);
      alert(error.response?.data?.message || 'Error rejecting fulfillment');
    } finally {
      setLoading(false);
    }
  };

  const handleDispatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/dispatch/${selectedFulfillment._id}`,
        dispatchData,
        { withCredentials: true }
      );
      await fetchFulfillments();
      setShowDispatchModal(false);
      setSelectedFulfillment(null);
      setDispatchData({ trackingInfo: '', expectedDeliveryHours: '' });
      alert('Order dispatched successfully! Check the "Manage Deliveries" section to track this delivery.');
    } catch (error) {
      console.error('Error dispatching order:', error);
      alert(error.response?.data?.message || 'Error dispatching order');
    } finally {
      setLoading(false);
    }
  };

  const openDispatchModal = (fulfillment) => {
    setSelectedFulfillment(fulfillment);
    setShowDispatchModal(true);
  };

  const handleOpenChat = (fulfillment) => {
    setSelectedRequestId(fulfillment.survivorRequest?._id || fulfillment.survivorRequest);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedRequestId(null);
  };

  const filteredFulfillments = fulfillments.filter(f => {
    const matchesSearch = 
      f.inventoryItem?.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.ngo?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || f.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Dispatched': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Fulfillment Requests
        </h2>
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Total: {fulfillments.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }`}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-4 py-2 border rounded-lg ${
            theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
          }`}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFulfillments.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <Package className={`mx-auto h-12 w-12 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={`mt-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No fulfillment requests found
            </p>
          </div>
        ) : (
          filteredFulfillments.map(fulfillment => (
            <div key={fulfillment._id} className={`p-6 rounded-lg shadow-sm border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {fulfillment.inventoryItem?.itemName}
                  </h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {fulfillment.inventoryItem?.itemType}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fulfillment.status)}`}>
                  {fulfillment.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">NGO:</span> {fulfillment.ngo?.name}
                </div>
                <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <Package className="mr-2 h-4 w-4" />
                  <span className="font-medium">Requested:</span> {fulfillment.requestedQuantity} {fulfillment.inventoryItem?.unit}
                  {fulfillment.fulfilledQuantity > 0 && (
                    <span className="ml-2 text-blue-600">
                      (Fulfilling: {fulfillment.fulfilledQuantity})
                    </span>
                  )}
                </div>
                <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="font-medium">Requested On:</span> {new Date(fulfillment.createdAt).toLocaleDateString()}
                </div>
                {fulfillment.message && (
                  <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <span className="font-medium">Message:</span> {fulfillment.message}
                  </div>
                )}
                {fulfillment.dispatchDetails?.trackingInfo && (
                  <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <Truck className="inline mr-2 h-4 w-4" />
                    <span className="font-medium">Tracking:</span> {fulfillment.dispatchDetails.trackingInfo}
                  </div>
                )}
                {fulfillment.dispatchDetails?.expectedDelivery && (
                  <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <span className="font-medium">Expected Delivery:</span>{' '}
                    {new Date(fulfillment.dispatchDetails.expectedDelivery).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center space-x-2">
                <button
                  onClick={() => handleOpenChat(fulfillment)}
                  className={`flex items-center px-3 py-1 text-sm border rounded-lg transition-colors ${
                    theme === 'light' 
                      ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50' 
                      : 'border-indigo-400 text-indigo-400 hover:bg-indigo-900/30'
                  }`}
                  title="Chat with NGO and Survivor"
                >
                  <MessageCircle className="mr-1 h-4 w-4" />
                  Chat
                </button>
                <div className="flex space-x-2">
                  {fulfillment.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAccept(fulfillment._id)}
                        disabled={loading}
                        className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(fulfillment._id)}
                        disabled={loading}
                        className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </button>
                    </>
                  )}
                  {fulfillment.status === 'Accepted' && (
                    <button
                      onClick={() => openDispatchModal(fulfillment)}
                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Truck className="mr-1 h-4 w-4" />
                      Dispatch
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && selectedFulfillment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Dispatch Order
              </h3>
              <button
                onClick={() => {
                  setShowDispatchModal(false);
                  setSelectedFulfillment(null);
                  setDispatchData({ trackingInfo: '', expectedDeliveryHours: '' });
                }}
                className={theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDispatch} className="p-6 space-y-4">
              <div>
                <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <strong>Item:</strong> {selectedFulfillment.inventoryItem?.itemName}<br />
                  <strong>Quantity:</strong> {selectedFulfillment.fulfilledQuantity} {selectedFulfillment.inventoryItem?.unit}<br />
                  <strong>NGO:</strong> {selectedFulfillment.ngo?.name}
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Tracking Information *
                </label>
                <input
                  type="text"
                  value={dispatchData.trackingInfo}
                  onChange={(e) => setDispatchData({ ...dispatchData, trackingInfo: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  placeholder="e.g., TRACK12345"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Expected Delivery Time (hours)
                </label>
                <input
                  type="number"
                  value={dispatchData.expectedDeliveryHours}
                  onChange={(e) => setDispatchData({ ...dispatchData, expectedDeliveryHours: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  placeholder="Leave empty for default delivery time"
                  min="1"
                />
                <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Leave empty to use your default delivery time
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Dispatching...' : 'Dispatch Order'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDispatchModal(false);
                    setSelectedFulfillment(null);
                    setDispatchData({ trackingInfo: '', expectedDeliveryHours: '' });
                  }}
                  className={`px-4 py-2 border rounded-lg ${
                    theme === 'light' ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
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