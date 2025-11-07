import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, Edit, MessageCircle, MapPin, Calendar, Package, Truck, CheckCircle } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import ChatModal from '../../components/ChatModal';
import { setRequests, setLoading, setError, clearError } from '../../store/requestSlice';
import axios from 'axios';

const RequestsSection = ({ setActiveSection }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.app);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Verified":
        return theme === "light"
          ? "bg-green-100 text-green-700"
          : "bg-green-900/50 text-green-400";
      case "Complete":
        return theme === "light"
          ? "bg-blue-100 text-blue-700"
          : "bg-blue-900/50 text-blue-400";
      case "Ongoing":
        return theme === "light"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-yellow-900/50 text-yellow-400";
      case "Pending":
        return theme === "light"
          ? "bg-gray-100 text-gray-700"
          : "bg-gray-700 text-gray-300";
      case "In Transit":
        return theme === "light"
          ? "bg-blue-100 text-blue-700"
          : "bg-blue-900/50 text-blue-400";
      default:
        return theme === "light"
          ? "bg-gray-100 text-gray-700"
          : "bg-gray-700 text-gray-300";
    }
  };

  const getUrgencyClasses = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    const fetchMyRequests = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/request/my-requests`,
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
          survivorId: req.survivorId,
          survivorName: req.survivorName,
          survivorPhone: req.survivorPhone,
          acceptedBy: req.acceptedBy,
          chatEnabled: req.chatEnabled,
          responders: req.responders || [],
          fulfillmentRequests: req.fulfillmentRequests || [],
        }));
        
        dispatch(setRequests(formattedRequests));
      } catch (err) {
        console.error('Error fetching requests:', err);
        dispatch(setError(err.response?.data?.message || 'Failed to fetch requests'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (user) {
      fetchMyRequests();
    }
  }, [dispatch, user]);

  const handleMarkComplete = async (id) => {
    const confirmed = window.confirm('Mark this request as complete? This action cannot be undone.');
    if (!confirmed) return;
    
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/request/complete/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert(response.data.message || 'Request marked as complete successfully. Awaiting volunteer verification.');
      
      // Refresh the requests list
      const refreshResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/request/my-requests`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const formattedRequests = refreshResponse.data.requests.map(req => ({
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
        survivorId: req.survivorId,
        survivorName: req.survivorName,
        survivorPhone: req.survivorPhone,
        acceptedBy: req.acceptedBy,
        chatEnabled: req.chatEnabled,
        responders: req.responders || [],
        fulfillmentRequests: req.fulfillmentRequests || [],
      }));
      
      dispatch(setRequests(formattedRequests));
    } catch (err) {
      console.error('Mark complete error:', err);
      dispatch(setError(err.response?.data?.message || 'Failed to mark request as complete'));
      alert(err.response?.data?.message || 'Failed to mark request as complete');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerifyRequest = async (id) => {
    const verificationNotes = prompt('Please confirm that your needs have been satisfied. Optional: Add any feedback:');
    
    // User clicked cancel
    if (verificationNotes === null) return;
    
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/request/verify/${id}`,
        { verificationNotes },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert(response.data.message || 'Request verified successfully! Thank you for confirming.');
      
      // Refresh the requests list
      const refreshResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/request/my-requests`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const formattedRequests = refreshResponse.data.requests.map(req => ({
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
        survivorId: req.survivorId,
        survivorName: req.survivorName,
        survivorPhone: req.survivorPhone,
        acceptedBy: req.acceptedBy,
        chatEnabled: req.chatEnabled,
        responders: req.responders || [],
        fulfillmentRequests: req.fulfillmentRequests || [],
      }));
      
      dispatch(setRequests(formattedRequests));
    } catch (err) {
      console.error('Verify request error:', err);
      dispatch(setError(err.response?.data?.message || 'Failed to verify request'));
      alert(err.response?.data?.message || 'Failed to verify request');
    } finally {
      dispatch(setLoading(false));
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
      <h2
        className={`text-2xl font-bold drop-shadow mb-6 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Your Requests
      </h2>

      <div
        className={`backdrop-blur border rounded-xl overflow-hidden shadow-lg ${
          theme === "light"
            ? "bg-white/95 border-gray-200"
            : "bg-gray-900/95 border-gray-700"
        }`}
      >
        <div
          className={`p-4 border-b ${
            theme === "light" ? "border-gray-200 bg-gray-50" : "bg-gray-800"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3
              className={`font-semibold text-lg ${
                theme === "light" ? "text-indigo-700" : "text-indigo-400"
              }`}
            >
              All Requests
            </h3>
            <button
              onClick={() => setActiveSection("report")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              New Request
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`p-6 ${theme === "light" ? "" : "divide-gray-700"}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-lg ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {request.type}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {request.description}
                  </p>
                  <p
                    className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Contact Info: {request.contactInfo || 'N/A'}
                  </p>
                  <p
                    className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Survivor Phone: {request.survivorPhone || 'N/A'}
                  </p>
                  
                  {/* Location Information */}
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Address: {request.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Location: {request.latitude}, {request.longitude}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Created At: {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Responders List */}
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
                        {request.responders.map((responder, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs rounded-full ${
                              responder.userRole === "NGO"
                                ? "bg-blue-100 text-blue-700"
                                : responder.userRole === "Volunteer"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {responder.userName} ({responder.userRole})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show fulfillment requests */}
                  {request.fulfillmentRequests && request.fulfillmentRequests.length > 0 && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      theme === "light" ? "bg-green-50 border border-green-200" : "bg-green-900/20 border border-green-700"
                    }`}>
                      <p className={`text-xs font-semibold mb-2 ${
                        theme === "light" ? "text-green-800" : "text-green-300"
                      }`}>
                        <Truck className="w-4 h-4 inline mr-1" />
                        Supply Requests ({request.fulfillmentRequests.length}):
                      </p>
                      {
                        request.fulfillmentRequests.map((fulfillment, idx) => (
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
                                  {fulfillment.inventoryItem?.name || 'Item'} - {fulfillment.requestedQuantity}
                                </p>
                                {fulfillment.dispatchDetails?.trackingInfo && (
                                  <p className={`text-xs mt-1 ${
                                    theme === "light" ? "text-gray-500" : "text-gray-500"
                                  }`}>
                                    <Package className="w-3 h-3 inline mr-1" /> Tracking: {fulfillment.dispatchDetails.trackingInfo}
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
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )}

                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      getStatusClasses(request.status)
                    }`}
                  >
                    {request.status}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      getUrgencyClasses(request.urgency)
                    }`}
                  >
                    {request.urgency} Priority
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <span
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Submitted: {new Date(request.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  {/* Mark as Complete Button (only for Delivered status) */}
                  {request.status === "Delivered" && user.userType === "Survivor" && (
                    <button
                      onClick={() => handleMarkComplete(request.id)}
                      className="px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Complete
                    </button>
                  )}

                  {/* Verify Completion Button (only for Complete status) */}
                  {request.status === "Complete" && user.userType === "Survivor" && (
                    <button
                      onClick={() => handleVerifyRequest(request.id)}
                      className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify Completion
                    </button>
                  )}

                  {/* Chat Button (only if chat is enabled) */}
                  {request.chatEnabled && (
                    <button
                      onClick={() => handleOpenChat(request)}
                      className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Modal */}
      {selectedRequest && (
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

export default RequestsSection;