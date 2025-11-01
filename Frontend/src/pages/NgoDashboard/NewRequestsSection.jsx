import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, 
  MapPin, 
  Calendar,
  MessageCircle
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
import axios from 'axios';

const NewRequestsSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { pendingRequests, loading, error } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.app);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const loadRequests = useCallback(() => {
    if (user && user.userType === 'NGO') {
      dispatch(fetchPendingRequests());
    }
    console.log('Pending Requests:', pendingRequests);
    // console.log('Accepted Requests:', acceptedRequests); // Not needed here
  }, [dispatch, user]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

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
      loadRequests(); // Use loadRequests to refresh pending list
    } catch (err) {
      console.error('Mark complete error:', err);
      dispatch(setRequestError(err.response?.data?.message || 'Failed to mark request as complete'));
      alert(err.response?.data?.message || 'Failed to mark request as complete');
    } finally {
      dispatch(setRequestLoading(false));
    }
  };

  const handleAcceptRequest = async (id) => {
    dispatch(setRequestLoading(true));
    dispatch(clearRequestError());
    try {
      await dispatch(acceptRequestAsync(id)).unwrap(); // Dispatch async thunk
      
      alert(`Request accepted successfully!`);
      
      loadRequests(); // Refresh both lists (will update pending and accepted in store)
    } catch (err) {
      console.error('Accept request error:', err);
      dispatch(setRequestError(err));
      alert(err || 'Failed to accept request');
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
        {/* Accept Button (only for Pending requests) */}
        {request.status === 'Pending' && (
          <button
            onClick={() => handleAcceptRequest(request.id)}
            className="px-3 sm:px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            Accept Request
          </button>
        )}
        
        {/* Mark Complete Button (only for Ongoing requests if user is a responder) */}
        {request.status === 'Ongoing' && (
          <button
            onClick={() => handleMarkComplete(request.id)}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Mark as Complete
          </button>
        )}
        
        {/* Chat Button (ONLY for Accepted/Ongoing requests - NOT for New Requests) */}
        {/* {request.chatEnabled && (
          <button
            onClick={() => handleOpenChat(request)}
            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Open Chat
          </button>
        )} */}

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
      }`}>Loading new requests...
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
          New Requests
        </h1>
      </div>

      {/* Pending Requests Section */}
      {/* <h2 className={`text-2xl font-bold mb-4 ${
        theme === "light" ? "text-gray-900" : "text-white"
      }`}>Pending Requests</h2> */}
      <div className="grid gap-4 sm:gap-6 mb-8">
        {pendingRequests.length === 0 ? (
          <p className={`text-center ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}>No new requests found.</p>
        ) : (
          pendingRequests.map(renderRequestCard)
        )}
      </div>

      {/* Chat Modal (only if needed for some reason, but typically only for accepted requests) */}
      {selectedRequest && isChatOpen && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          requestId={selectedRequest.id}
          theme={theme} // Pass theme prop
        />
      )}
    </div>
  );
};

export default NewRequestsSection;
