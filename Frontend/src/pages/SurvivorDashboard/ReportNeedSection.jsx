import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { addRequest, setLoading, setError, clearError } from '../../store/requestSlice';

const ReportNeedSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  
  const [newRequest, setNewRequest] = useState({
    type: '', 
    urgency: '', 
    description: '', 
    location: '', 
    contactInfo: ''
  });

  const handleSubmitRequest = async () => {
    if (newRequest.type && newRequest.urgency && newRequest.description) {
      dispatch(setLoading(true));
      dispatch(clearError());
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const request = {
          id: requests.length + 1, // This should ideally come from backend
          type: newRequest.type,
          status: 'Pending',
          date: new Date().toLocaleDateString(),
          urgency: newRequest.urgency,
          description: newRequest.description,
          location: newRequest.location,
          contactInfo: newRequest.contactInfo,
        };
        dispatch(addRequest(request));
        setNewRequest({ type: '', urgency: '', description: '', location: '', contactInfo: '' });
        alert('Request submitted successfully!');
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div>
      <h2 className={`text-2xl font-bold drop-shadow mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Report a Need
      </h2>
      
      <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <div className="space-y-6">
          {/* Need Type */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              What do you need help with? *
            </label>
            <select
              value={newRequest.type}
              onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg ${
                theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
              }`}
            >
              <option value="">Select a need type</option>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Water">Water</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Clothing">Clothing</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Urgency Level */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              Urgency Level *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Low', 'Medium', 'High'].map((level) => (
                <button
                  key={level}
                  onClick={() => setNewRequest({...newRequest, urgency: level})}
                  className={`px-4 py-2 border rounded-lg transition ${
                    newRequest.urgency === level
                      ? `border-${level === 'High' ? 'red' : level === 'Medium' ? 'yellow' : 'green'}-500 bg-${level === 'High' ? 'red' : level === 'Medium' ? 'yellow' : 'green'}-50`
                      : theme === "light" ? "border-gray-300 hover:bg-gray-50" : "border-gray-600 hover:bg-gray-700"
                  } ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              Description *
            </label>
            <textarea
              value={newRequest.description}
              onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
              rows={4}
              placeholder="Please describe your need in detail..."
              className={`w-full px-3 py-2 border rounded-lg ${
                theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
              }`}
            />
          </div>

          {/* Location */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              Current Location
            </label>
            <input
              type="text"
              value={newRequest.location}
              onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
              placeholder="Your current address or general area"
              className={`w-full px-3 py-2 border rounded-lg ${
                theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
              }`}
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              Best Contact Method
            </label>
            <input
              type="text"
              value={newRequest.contactInfo}
              onChange={(e) => setNewRequest({...newRequest, contactInfo: e.target.value})}
              placeholder="Phone number or alternative contact method"
              className={`w-full px-3 py-2 border rounded-lg ${
                theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
              }`}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmitRequest}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Submit Request
            </button>
            <button
              onClick={() => setNewRequest({ type: '', urgency: '', description: '', location: '', contactInfo: '' })}
              className={`px-6 py-3 border rounded-lg transition ${
                theme === "light" ? "border-gray-300 hover:bg-gray-50" : "border-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportNeedSection;