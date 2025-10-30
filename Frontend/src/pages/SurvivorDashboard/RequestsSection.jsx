import React, { useContext, useState } from "react";
import { useSelector } from 'react-redux';
import { PlusCircle, Edit, MessageCircle } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import ChatModal from '../../components/ChatModal';

const RequestsSection = ({ setActiveSection }) => {
  const { theme } = useContext(ThemeContext);
  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.app);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      <h2 className={`text-2xl font-bold drop-shadow mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Your Requests
      </h2>
      
      <div className={`backdrop-blur border rounded-xl overflow-hidden shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <div className={`p-4 border-b ${
          theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800"
        }`}>
          <div className="flex justify-between items-center">
            <h3 className={`font-semibold text-lg ${theme === "light" ? "text-indigo-700" : "text-indigo-400"}`}>
              All Requests
            </h3>
            <button
              onClick={() => setActiveSection('report')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              New Request
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {requests.map(request => (
            <div key={request.id} className={`p-6 ${theme === "light" ? "" : "divide-gray-700"}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {request.type}
                  </h4>
                  <p className={`text-sm mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {request.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    request.status === 'Pending' ? 
                      (theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-gray-300") :
                    request.status === 'Approved' ?
                      (theme === "light" ? "bg-green-100 text-green-700" : "bg-green-900/50 text-green-400") :
                      (theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-900/50 text-blue-400")
                  }`}>
                    {request.status}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    request.urgency === 'High' ? 'bg-red-100 text-red-700' :
                    request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {request.urgency} Priority
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <span className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  Submitted: {request.date}
                </span>
                <div className="flex gap-2">
                  {/* Chat Button (only for Approved/Completed requests with chat enabled) */}
                  {request.chatEnabled && (request.status === 'Approved' || request.status === 'Completed') && (
                    <button 
                      onClick={() => handleOpenChat(request)}
                      className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                  )}
                  
                  {/* Edit Button (only for Pending requests) */}
                  {request.status === 'Pending' && (
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        request={selectedRequest}
        currentUser={{
          id: user?.id || 'survivor-1',
          name: user?.name || 'Survivor',
          role: 'Survivor'
        }}
      />
    </div>
  );
};

export default RequestsSection;