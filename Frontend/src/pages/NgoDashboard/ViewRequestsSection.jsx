import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, 
  MapPin, 
  Calendar,
  MessageCircle
} from "lucide-react";
import { 
  updateRequestStatus,
  acceptRequest, 
  setRequests,
  setLoading as setRequestLoading, 
  setError as setRequestError, 
  clearError as clearRequestError 
} from '../../store/requestSlice';
import { ThemeContext } from "../../context/ThemeContext";
import ChatModal from '../../components/ChatModal';
import axios from 'axios';

const ViewRequestsSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.app);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch all requests function (can be called anytime)
  const fetchAllRequests = async () => {
    dispatch(setRequestLoading(true));
    dispatch(clearRequestError());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/request/all`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Format the requests for the frontend
      const formattedRequests = response.data.requests.map(req => ({
        id: req._id,
        type: req.type,
        status: req.status,
        date: new Date(req.createdAt).toLocaleDateString(),
        urgency: req.urgency,
        description: req.description,
        latitude: req.latitude,
        longitude: req.longitude,
        address: req.address,
        location: req.location,
        contactInfo: req.contactInfo,
        survivorId: req.survivorId?._id || req.survivorId,
        survivorName: req.survivorName || req.survivorId?.name,
        acceptedBy: req.acceptedBy?._id || req.acceptedBy,
          chatEnabled: req.chatEnabled,
          responders: req.responders || [], // Include responders array
        }));
        
        dispatch(setRequests(formattedRequests));
      } catch (err) {
        console.error('Error fetching requests:', err);
        dispatch(setRequestError(err.response?.data?.message || 'Failed to fetch requests'));
      } finally {
        dispatch(setRequestLoading(false));
      }
    };

  // Fetch all requests on component mount
  useEffect(() => {
    if (user) {
      fetchAllRequests();
    }
  }, [dispatch, user]);

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
      await fetchAllRequests();
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/request/accept/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Update local state with the new request data
      dispatch(acceptRequest({ 
        id, 
        acceptedBy: user?.id,
        responders: response.data.request.responders
      }));
      
      alert(`Request accepted successfully! Total responders: ${response.data.totalResponders}`);
      
      // Refresh the requests list to show updated data
      await fetchAllRequests();
    } catch (err) {
      console.error('Accept request error:', err);
      dispatch(setRequestError(err.response?.data?.message || 'Failed to accept request'));
      alert(err.response?.data?.message || 'Failed to accept request');
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          View Requests
        </h1>
        {/* New Request button might navigate to a form or modal */}
        <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Request Cards */}
      <div className="grid gap-4 sm:gap-6">
        {requests.map((request) => (
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
              
              {/* Chat Button (only for Ongoing/Complete requests with chat enabled) */}
              {request.chatEnabled && (request.status === 'Ongoing' || request.status === 'Complete' || request.status === 'Verified') && (
                <button
                  onClick={() => handleOpenChat(request)}
                  className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open Chat
                </button>
              )}

              <button className="px-3 sm:px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        request={selectedRequest}
        currentUser={{
          id: user?.id || 'ngo-1',
          name: user?.name || 'NGO Representative',
          role: 'NGO'
        }}
      />
    </div>
  );
};

export default ViewRequestsSection;