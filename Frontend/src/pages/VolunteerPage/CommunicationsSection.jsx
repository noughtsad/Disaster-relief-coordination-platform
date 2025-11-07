import React, { useContext, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
  Send,
  Mail,
  MessageSquare,
  Users,
  MapPin,
  Calendar,
  Package,
  Truck,
  CheckCircle
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import ChatModal from "../../components/ChatModal";
import axios from 'axios';

const CommunicationsSection = () => {
  const { theme } = useContext(ThemeContext);
  const user = useSelector((state) => state.app.user);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [allRequests, setAllRequests] = useState([]); // New state for all requests

  useEffect(() => {
    const fetchAllRequests = async () => {
      if (user && user.userType === 'Volunteer') {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/request/all`, { withCredentials: true });
          setAllRequests(response.data.requests);
        } catch (error) {
          console.error("Error fetching all requests:", error);
        }
      }
    };
    fetchAllRequests();
  }, [user]);

  const openChatModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedRequestId(null);
  };

  const handleVerifyCompletion = async (requestId) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/request/verify/${requestId}`, {}, { withCredentials: true });
      alert("Request verified successfully! Chat disabled.");
      setAllRequests(prevRequests => prevRequests.map(req => 
        req._id === requestId ? { ...req, status: "Verified", chatEnabled: false } : req
      ));
    } catch (error) {
      console.error("Error verifying request:", error);
      alert(error.response?.data?.message || "Error verifying request");
    }
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          All Chats
        </h1>
      </div>

      {/* Communication Types */}
      {/* <div className="grid grid-cols-3 gap-6 mb-8">
        <div
          className={`p-6 rounded-xl shadow text-center ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <Mail className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Email Campaigns
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Send newsletters and updates
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create Email
          </button>
        </div>

        <div
          className={`p-6 rounded-xl shadow text-center ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <MessageSquare className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            SMS Alerts
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Quick notifications to volunteers
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Send SMS
          </button>
        </div>

        <div
          className={`p-6 rounded-xl shadow text-center ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <Users className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Social Media
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Share updates and campaigns
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Post Update
          </button>
        </div>
      </div> */}

      {/* Recent Communications */}
      <div
        className={`rounded-xl shadow overflow-hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <div
          className={`px-6 py-4 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Available Requests
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {allRequests.length > 0 ? (
            allRequests.map((request) => (
              <div
                key={request._id}
                className={`p-6 flex justify-between items-center ${
                  theme === "light" ? "" : "divide-gray-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Request Type: {request.type}
                    </h4>
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Description: {request.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(request.status)}`}>
                        Status: {request.status}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getUrgencyClasses(request.urgency)}`}>
                        Urgency: {request.urgency}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Survivor: {request.survivorName || 'N/A'}
                    </p>
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Contact Info: {request.contactInfo || 'N/A'}
                    </p>
                    <p
                      className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Survivor Phone: {request.survivorPhone || 'N/A'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p
                        className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Address: {request.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p
                        className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Created At: {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>

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

                    {/* Show Supply Requests */}
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
                </div>
                <div className="flex flex-col items-end gap-2">
                  {request.status === "Complete" && user.userType === "Volunteer" && (
                    <button
                      onClick={() => handleVerifyCompletion(request._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify Completion
                    </button>
                  )}
                  {request.chatEnabled && (
                    <button
                      onClick={() => openChatModal(request._id)}
                      className="flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Chat
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={`p-6 text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No chat rooms available.</p>
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
};

export default CommunicationsSection;
