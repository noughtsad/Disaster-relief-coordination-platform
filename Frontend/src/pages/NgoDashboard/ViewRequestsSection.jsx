import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, 
  MapPin, 
  Calendar,
  MessageCircle,
  Package,
  Truck,
  CheckCircle
} from "lucide-react";
import { 
  fetchPendingRequests,
  fetchAcceptedRequests,
  acceptRequestAsync,
  setLoading as setRequestLoading, 
  setError as setRequestError, 
  clearError as clearRequestError 
} from '../../store/requestSlice';
import { ThemeContext } from "../../context/ThemeContext";
import ChatModal from '../../components/ChatModal';
import SupplierSelectionModal from '../../components/SupplierSelectionModal';
import axios from 'axios';

const AcceptedRequestsSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { acceptedRequests, loading, error } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.app);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [selectedRequestForSupplier, setSelectedRequestForSupplier] = useState(null);
  const ngoProfile = useSelector((state) => state.ngo.ngoProfile);
  const [fulfillmentsByRequest, setFulfillmentsByRequest] = useState({});

  const loadRequests = useCallback(() => {
    if (user && user.userType === 'NGO') {
      dispatch(fetchAcceptedRequests());
    }
  }, [dispatch, user]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Fetch fulfillments for all accepted requests
  useEffect(() => {
    const fetchFulfillments = async () => {
      if (acceptedRequests.length === 0) return;

      const fulfillmentsMap = {};
      
      for (const request of acceptedRequests) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/fulfillment/request/${request.id}`,
            { withCredentials: true }
          );
          fulfillmentsMap[request.id] = response.data.fulfillments || [];
        } catch (error) {
          console.error(`Error fetching fulfillments for request ${request.id}:`, error);
          fulfillmentsMap[request.id] = [];
        }
      }
      
      setFulfillmentsByRequest(fulfillmentsMap);
    };

    fetchFulfillments();
  }, [acceptedRequests]);

  const handleMarkReceived = async (fulfillmentId, requestId) => {
    if (!window.confirm('Confirm that supplies have been received?')) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/delivered/${fulfillmentId}`,
        {},
        { withCredentials: true }
      );
      
      alert('Supplies marked as received successfully!');
      
      // Refresh fulfillments for this request
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/request/${requestId}`,
        { withCredentials: true }
      );
      
      setFulfillmentsByRequest(prev => ({
        ...prev,
        [requestId]: response.data.fulfillments || []
      }));
      
      // Refresh the requests list
      loadRequests();
    } catch (error) {
      console.error('Error marking supplies as received:', error);
      alert(error.response?.data?.message || 'Failed to mark supplies as received');
    }
  };

  const handleMarkComplete = async (id) => {
    const completionNotes = prompt('Optional: Add any notes about the completion (e.g., items delivered, services provided):');
    
    // User clicked cancel
    if (completionNotes === null) return;
    
    dispatch(setRequestLoading(true));
    dispatch(clearRequestError());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/request/complete/${id}`,
        { completionNotes },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert(response.data.message || 'Request marked as complete! Awaiting survivor verification.');
      
      // Refresh the requests list
      loadRequests(); // Use loadRequests to refresh accepted list
    } catch (err) {
      console.error('Mark complete error:', err);
      dispatch(setRequestError(err.response?.data?.message || 'Failed to mark request as complete'));
      alert(err.response?.data?.message || 'Failed to mark request as complete');
    } finally {
      dispatch(setRequestLoading(false));
    }
  };

  const handleOpenChat = (request) => {
    setSelectedRequest(request);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedRequest(null);
  };

  const renderRequestCard = (request) => (
    <div
      key={request.id}
      className={`p-4 sm:p-6 rounded-xl shadow ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3
            className={`text-xl font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            {request.type} {/* Using type from requestSlice */}
          </h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {request.location}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {request.date}
              </span>
            </div>
          </div>
          <p
            className={`mb-3 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {request.description} {/* Using description from requestSlice */}
          </p>

          {/* Show coordinates if available */}
          {request.latitude && request.longitude && (
            <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
              📍 Coordinates: {request.latitude}, {request.longitude}
              {request.address && <div className="mt-1">📮 {request.address}</div>}
            </div>
          )}

          {/* Show responders */}
          {request.responders && request.responders.length > 0 && (
            <div className={`mt-3 p-2 rounded-lg ${
              theme === "light" ? "bg-blue-50 border border-blue-200" : "bg-blue-900/20 border border-blue-700"
            }`}>
              <p className={`text-xs font-semibold mb-1 ${
                theme === "light" ? "text-blue-800" : "text-blue-300"
              }`}>
                {request.responders.length} Helper{request.responders.length > 1 ? 's' : ''} Assigned:
              </p>
              <div className="flex flex-wrap gap-1">
                {request.responders.map((responder, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded text-xs ${
                      theme === "light" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-blue-800 text-blue-200"
                    }`}
                  >
                    {responder.userName} ({responder.userRole})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Show fulfillment requests */}
          {fulfillmentsByRequest[request.id] && fulfillmentsByRequest[request.id].length > 0 && (
            <div className={`mt-3 p-3 rounded-lg ${
              theme === "light" ? "bg-green-50 border border-green-200" : "bg-green-900/20 border border-green-700"
            }`}>
              <p className={`text-xs font-semibold mb-2 ${
                theme === "light" ? "text-green-800" : "text-green-300"
              }`}>
                <Truck className="w-4 h-4 inline mr-1" />
                Supply Requests ({fulfillmentsByRequest[request.id].length}):
              </p>
              {fulfillmentsByRequest[request.id].map((fulfillment, idx) => (
                <div key={idx} className={`mb-2 last:mb-0 p-2 rounded ${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${
                        theme === "light" ? "text-gray-900" : "text-gray-100"
                      }`}>
                        {fulfillment.supplier?.name || 'Supplier'}
                      </p>
                      <p className={`text-xs ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}>
                        {fulfillment.inventoryItem?.itemName} - {fulfillment.requestedQuantity} {fulfillment.inventoryItem?.unit}
                      </p>
                      {fulfillment.dispatchDetails?.trackingInfo && (
                        <p className={`text-xs mt-1 ${
                          theme === "light" ? "text-gray-500" : "text-gray-500"
                        }`}>
                          📦 Tracking: {fulfillment.dispatchDetails.trackingInfo}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        fulfillment.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : fulfillment.status === 'Dispatched'
                          ? 'bg-blue-100 text-blue-800'
                          : fulfillment.status === 'Accepted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : fulfillment.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {fulfillment.status}
                      </span>
                      {fulfillment.status === 'Dispatched' && (
                        <button
                          onClick={() => handleMarkReceived(fulfillment._id, request.id)}
                          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Mark Received
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              request.urgency === "High"
                ? "bg-red-100 text-red-800"
                : request.urgency === "Medium"
                ? "bg-orange-100 text-orange-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {request.urgency} Priority
          </span>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              request.status === "Verified"
                ? "bg-green-100 text-green-800"
                : request.status === "Complete"
                ? "bg-blue-100 text-blue-800"
                : request.status === "Ongoing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {request.status}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Accept Button (ONLY for Accepted Requests) - Removed from here, now in NewRequestsSection */}
        
        {/* Mark Complete Button (only for Ongoing requests if user is a responder) */}
        {request.status === 'Ongoing' && (
          <button
            onClick={() => handleMarkComplete(request.id)}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Mark as Complete
          </button>
        )}
        
        {/* Chat Button (only for Ongoing/Complete requests with chat enabled) */}
        {request.chatEnabled && (
          <button
            onClick={() => handleOpenChat(request)}
            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Open Chat
          </button>
        )}

        {/* Request Supplies Button */}
        <button 
          onClick={() => {
            setSelectedRequestForSupplier(request);
            setIsSupplierModalOpen(true);
          }}
          className="px-3 sm:px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          Request Supplies
        </button>

        <button className="px-3 sm:px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
          View Details
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`text-center py-8 ${
        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
      }`}>Loading accepted requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 text-red-500`}>Error: {error}</div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Accepted Requests
        </h1>
      </div>

      {/* Accepted Requests Section */}
      <div className="grid gap-4 sm:gap-6">
        {acceptedRequests.length === 0 ? (
          <p className={`text-center ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}>No accepted requests found.</p>
        ) : (
          acceptedRequests.map(renderRequestCard)
        )}
      </div>

      {/* Chat Modal */}
      {selectedRequest && isChatOpen && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          requestId={selectedRequest.id}
          theme={theme} // Pass theme prop
        />
      )}

      {/* Supplier Selection Modal */}
      {selectedRequestForSupplier && (
        <SupplierSelectionModal
          isOpen={isSupplierModalOpen}
          onClose={() => {
            setIsSupplierModalOpen(false);
            setSelectedRequestForSupplier(null);
          }}
          theme={theme}
          requestId={selectedRequestForSupplier.id}
          itemType={selectedRequestForSupplier.type}
          ngoLocation={
            ngoProfile?.ngoLatitude && ngoProfile?.ngoLongitude
              ? {
                  lat: parseFloat(ngoProfile.ngoLatitude),
                  lng: parseFloat(ngoProfile.ngoLongitude),
                }
              : null
          }
        />
      )}
    </div>
  );
};

export default AcceptedRequestsSection;