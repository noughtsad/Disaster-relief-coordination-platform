import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import MapComponent from "../../components/Map";
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

  return (
    <div>
      <h2 className={`text-2xl font-bold drop-shadow mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Dashboard
      </h2>
      <MapComponent />
      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total Requests</p>
              <h3 className={`text-2xl font-bold mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {requests.length}
              </h3>
            </div>
            <List className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        
        <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Approved</p>
              <h3 className={`text-2xl font-bold mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {requests.filter(r => r.status === 'Approved' || r.status === 'Completed').length}
              </h3>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Pending</p>
              <h3 className={`text-2xl font-bold mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {requests.filter(r => r.status === 'Pending').length}
              </h3>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Alerts */}
      <h3 className={`font-semibold text-lg drop-shadow mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
        Active Alerts
      </h3>
      <div className="space-y-4 mb-8">
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
      <div className={`backdrop-blur border rounded-xl overflow-hidden mb-8 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <div className={`p-4 border-b ${
          theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800"
        }`}>
          <h3 className={`font-semibold text-lg ${theme === "light" ? "text-indigo-700" : "text-indigo-400"}`}>
            Your Recent Requests
          </h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className={`font-medium ${
            theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"
          }`}>
            <tr>
              <th className="px-6 py-3">Request</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Urgency</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className={theme === "light" ? "text-gray-900" : "text-gray-100"}>
            {requests.slice(0, 3).map(request => (
              <tr key={request.id} className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                <td className="px-6 py-3">{request.type}</td>
                <td className="px-6 py-3">
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
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.urgency === 'High' ? 'bg-red-100 text-red-700' :
                    request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {request.urgency}
                  </span>
                </td>
                <td className="px-6 py-3">{request.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Emergency Information Cards */}
      <h3 className={`font-semibold text-lg drop-shadow mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
        Emergency Information
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`backdrop-blur border rounded-xl p-5 flex flex-col justify-between shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div>
            <h4 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Emergency Contacts
            </h4>
            <p className={`text-sm mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Important phone numbers for emergency services.
            </p>
          </div>
          <button 
            onClick={() => setActiveSection('emergency')}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
          >
            View
          </button>
        </div>

        <div className={`backdrop-blur border rounded-xl p-5 flex flex-col justify-between shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <div>
            <h4 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Safety Tips
            </h4>
            <p className={`text-sm mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Essential safety guidelines during and after a disaster.
            </p>
          </div>
          <button 
            onClick={() => setActiveSection('emergency')}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;