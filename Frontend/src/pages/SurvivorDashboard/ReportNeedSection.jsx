import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, MapPin, Loader } from "lucide-react";
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
    latitude: '', 
    longitude: '',
    address: '',
    contactInfo: ''
  });

  const [fetchingLocation, setFetchingLocation] = useState(false);

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setFetchingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setNewRequest(prev => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6)
        }));

        // Reverse geocode to get address
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            setNewRequest(prev => ({
              ...prev,
              address: data.results[0].formatted_address
            }));
          }
        } catch (error) {
          console.error('Error fetching address:', error);
        }
        
        setFetchingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please enable location services.');
        setFetchingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleSubmitRequest = async () => {
    if (newRequest.type && newRequest.urgency && newRequest.description && newRequest.latitude && newRequest.longitude) {
      dispatch(setLoading(true));
      dispatch(clearError());
      try {
        // Import axios at the top if not already imported
        const axios = (await import('axios')).default;
        
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/request/create`,
          {
            type: newRequest.type,
            urgency: newRequest.urgency,
            description: newRequest.description,
            latitude: newRequest.latitude,
            longitude: newRequest.longitude,
            address: newRequest.address,
            contactInfo: newRequest.contactInfo,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        // Add the request to local state
        const request = {
          id: response.data.request._id,
          type: response.data.request.type,
          status: response.data.request.status,
          date: new Date(response.data.request.createdAt).toLocaleDateString(),
          urgency: response.data.request.urgency,
          description: response.data.request.description,
          latitude: response.data.request.latitude,
          longitude: response.data.request.longitude,
          address: response.data.request.address,
          location: response.data.request.location,
          contactInfo: response.data.request.contactInfo,
          survivorId: response.data.request.survivorId,
          acceptedBy: response.data.request.acceptedBy,
          chatEnabled: response.data.request.chatEnabled,
        };
        
        dispatch(addRequest(request));
        setNewRequest({ type: '', urgency: '', description: '', latitude: '', longitude: '', address: '', contactInfo: '' });
        alert('Request submitted successfully!');
      } catch (err) {
        console.error('Submit request error:', err);
        dispatch(setError(err.response?.data?.message || 'Failed to submit request'));
        alert(err.response?.data?.message || 'Failed to submit request. Please try again.');
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      alert('Please fill in all required fields including location');
    }
  };

  return (
    <div>
      <h2 className={`text-xl sm:text-2xl font-bold drop-shadow mb-4 sm:mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Report a Need
      </h2>
      
      <div className={`backdrop-blur border rounded-xl p-4 sm:p-6 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <div className="space-y-4 sm:space-y-6">
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
              Current Location *
            </label>
            
            {/* Get Location Button */}
            <button
              type="button"
              onClick={fetchCurrentLocation}
              disabled={fetchingLocation}
              className={`w-full px-4 py-3 mb-3 border rounded-lg transition flex items-center justify-center gap-2 ${
                fetchingLocation 
                  ? 'bg-gray-100 cursor-not-allowed' 
                  : theme === "light" 
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 hover:bg-indigo-100" 
                    : "border-indigo-400 bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50"
              }`}
            >
              {fetchingLocation ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Fetching Location...
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  Get My Current Location
                </>
              )}
            </button>

            {/* Display Coordinates */}
            {(newRequest.latitude || newRequest.longitude) && (
              <div className={`p-3 rounded-lg mb-3 ${
                theme === "light" ? "bg-green-50 border border-green-200" : "bg-green-900/20 border border-green-700"
              }`}>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className={`font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Latitude:
                    </span>
                    <p className={`${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {newRequest.latitude}
                    </p>
                  </div>
                  <div>
                    <span className={`font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Longitude:
                    </span>
                    <p className={`${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {newRequest.longitude}
                    </p>
                  </div>
                </div>
                {newRequest.address && (
                  <div className="mt-2 text-sm">
                    <span className={`font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Address:
                    </span>
                    <p className={`${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      {newRequest.address}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Manual Entry Option */}
            <details className="mt-2">
              <summary className={`cursor-pointer text-sm ${theme === "light" ? "text-indigo-600 hover:text-indigo-800" : "text-indigo-400 hover:text-indigo-300"}`}>
                Or enter manually
              </summary>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <input
                    type="number"
                    step="any"
                    value={newRequest.latitude}
                    onChange={(e) => setNewRequest({...newRequest, latitude: e.target.value})}
                    placeholder="Latitude"
                    className={`w-full px-3 py-2 border rounded-lg text-sm ${
                      theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    step="any"
                    value={newRequest.longitude}
                    onChange={(e) => setNewRequest({...newRequest, longitude: e.target.value})}
                    placeholder="Longitude"
                    className={`w-full px-3 py-2 border rounded-lg text-sm ${
                      theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                    }`}
                  />
                </div>
              </div>
            </details>
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
              onClick={() => setNewRequest({ type: '', urgency: '', description: '', latitude: '', longitude: '', address: '', contactInfo: '' })}
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