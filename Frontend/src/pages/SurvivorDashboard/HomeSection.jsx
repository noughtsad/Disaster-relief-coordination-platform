import React, { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import MapComponent from "../../components/Map";
import axios from "axios";
import { 
  List, 
  CheckCircle, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const HomeSection = ({ setActiveSection, alerts = [] }) => {
  const { theme } = useContext(ThemeContext);
  const { requests } = useSelector((state) => state.requests);
  const [ngos, setNgos] = useState([]);
  const [loadingNgos, setLoadingNgos] = useState(true);

  useEffect(() => {
    // Fetch all NGOs
    const fetchNgos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/ngo/all`,
          { withCredentials: true }
        );
        setNgos(response.data.ngos || []);
        console.log('Fetched NGOs:', response.data.ngos);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      } finally {
        setLoadingNgos(false);
      }
    };

    fetchNgos();
  }, []);

  return (
    <div>
      <h2 className={`text-xl sm:text-2xl font-bold drop-shadow mb-4 sm:mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Dashboard
      </h2>
      
      {/* Map with NGO markers */}
      {loadingNgos ? (
        <div className={`w-full h-96 flex items-center justify-center rounded border ${
          theme === "light" ? "bg-gray-100 border-gray-300" : "bg-gray-800 border-gray-700"
        }`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-3"></div>
            <p className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
              Loading nearby NGOs...
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <MapComponent ngos={ngos} showNgoMarkers={true} />
          <div className={`mt-2 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
            <span className="inline-flex items-center mr-4">
              <span className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
              Your Location
            </span>
            <span className="inline-flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span>
              NGO Locations ({ngos.length})
            </span>
          </div>
        </div>
      )}
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className={`backdrop-blur border rounded-xl p-4 sm:p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total Requests</p>
              <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {requests.length}
              </h3>
            </div>
            <List className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
          </div>
        </div>
        
        <div className={`backdrop-blur border rounded-xl p-4 sm:p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Approved</p>
              <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {requests.filter(r => r.status === 'Approved' || r.status === 'Completed').length}
              </h3>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
        </div>
        
        <div className={`backdrop-blur border rounded-xl p-4 sm:p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Pending</p>
              <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {requests.filter(r => r.status === 'Pending').length}
              </h3>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Alerts */}
      <h3 className={`font-semibold text-base sm:text-lg drop-shadow mb-3 sm:mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
        Active Alerts
      </h3>
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {alerts.map(alert => (
          <div key={alert.id} className={`backdrop-blur border rounded-xl p-4 shadow-lg flex items-start gap-4 ${
            alert.severity === 'High' ? (theme === "light" ? "bg-red-50/95 border-red-200" : "bg-red-900/95 border-red-700") :
            (theme === "light" ? "bg-yellow-50/95 border-yellow-200" : "bg-yellow-900/95 border-yellow-700")
          }`}>
            <AlertTriangle className={`w-6 h-6 mt-1 ${
              alert.severity === 'High' ? 'text-red-600' : 'text-yellow-600'
            }`} />
            <div>
              <h4 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>{alert.title}</h4>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{alert.details}</p>
              <p className={`text-xs mt-2 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>{alert.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className={`backdrop-blur border rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <div className={`p-3 sm:p-4 border-b ${
          theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800"
        }`}>
          <h3 className={`font-semibold text-base sm:text-lg ${theme === "light" ? "text-indigo-700" : "text-indigo-400"}`}>
            Your Recent Requests
          </h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead className={`font-medium ${
            theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"
          }`}>
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Request</th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Status</th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Urgency</th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Date</th>
            </tr>
          </thead>
          <tbody className={theme === "light" ? "text-gray-900" : "text-gray-100"}>
            {requests.slice(0, 3).map(request => (
              <tr key={request.id} className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">{request.type}</td>
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.status === 'Pending' ? 
                      (theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-gray-300") :
                    request.status === 'Approved' ?
                      (theme === "light" ? "bg-green-100 text-green-700" : "bg-green-900/50 text-green-400") :
                      (theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-900/50 text-blue-400")
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.urgency === 'High' ? 'bg-red-100 text-red-700' :
                    request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {request.urgency}
                  </span>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 whitespace-nowrap">{request.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Emergency Information Cards */}
      <h3 className={`font-semibold text-base sm:text-lg drop-shadow mb-3 sm:mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
        Emergency Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className={`backdrop-blur border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div>
            <h4 className={`font-medium text-sm sm:text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Emergency Contacts
            </h4>
            <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Important phone numbers for emergency services.
            </p>
          </div>
          <button 
            onClick={() => setActiveSection('emergency')}
            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-xs sm:text-sm rounded-lg hover:bg-indigo-700 transition"
          >
            View
          </button>
        </div>

        <div className={`backdrop-blur border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div>
            <h4 className={`font-medium text-sm sm:text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Safety Tips
            </h4>
            <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Essential safety guidelines during and after a disaster.
            </p>
          </div>
          <button 
            onClick={() => setActiveSection('emergency')}
            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-xs sm:text-sm rounded-lg hover:bg-indigo-700 transition"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;