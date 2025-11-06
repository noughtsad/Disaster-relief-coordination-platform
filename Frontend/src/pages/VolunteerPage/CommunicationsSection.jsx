import React, { useContext, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
  Send,
  Mail,
  MessageSquare,
  Users
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
      <div className="grid grid-cols-3 gap-6 mb-8">
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
          <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
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
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Post Update
          </button>
        </div>
      </div>

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
            Available Chat Rooms
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
                      Chat for Request: {request.title || request._id}
                    </h4>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Survivor: {request.survivorId?.name || 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => openChatModal(request._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Open Chat
                  </button>
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
