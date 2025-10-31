import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, Edit, MessageCircle } from "lucide-react";
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

  // Fetch user's requests on component mount
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
          acceptedBy: req.acceptedBy,
          chatEnabled: req.chatEnabled,
          responders: req.responders || [], // Include responders array
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

  const handleVerifyRequest = async (id) => {
    const verificationNotes = prompt('Please confirm that your needs have been satisfied. Optional: Add any feedback:');
    
    // User clicked cancel
    if (verificationNotes === null) return;
    
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await axios.post(
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
        acceptedBy: req.acceptedBy,
        chatEnabled: req.chatEnabled,
        responders: req.responders || [],
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
                  {/* Location Information */}
                  {(request.latitude || request.longitude || request.address) && (
                    <div className={`text-xs mt-2 space-y-1 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      {(request.latitude && request.longitude) && (
                        <div>📍 {request.latitude}, {request.longitude}</div>
                      )}
                      {request.address && (
                        <div>📮 {request.address}</div>
                      )}
                    </div>
                  )}
                  {/* Responders List */}
                  {request.responders && request.responders.length > 0 && (
                    <div className="mt-3">
                      <p className={`text-xs font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        {request.responders.length} Helper(s) Assigned:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {request.responders.map((responder, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 text-xs rounded-full ${
                              responder.userRole === 'NGO' ? 'bg-blue-100 text-blue-700' :
                              responder.userRole === 'Volunteer' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
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
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    request.status === 'Verified' ? 
                      (theme === "light" ? "bg-green-100 text-green-700" : "bg-green-900/50 text-green-400") :
                    request.status === 'Complete' ?
                      (theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-900/50 text-blue-400") :
                    request.status === 'Ongoing' ?
                      (theme === "light" ? "bg-yellow-100 text-yellow-700" : "bg-yellow-900/50 text-yellow-400") :
                      (theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-gray-300")
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
                  {/* Verify Button (only for Complete status) */}
                  {request.status === 'Complete' && (
                    <button 
                      onClick={() => handleVerifyRequest(request.id)}
                      className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      ✓ Verify Completion
                    </button>
                  )}
                  
                  {/* Chat Button (only for Ongoing/Complete/Verified requests with chat enabled) */}
                  {request.chatEnabled && (request.status === 'Ongoing' || request.status === 'Complete' || request.status === 'Verified') && (
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