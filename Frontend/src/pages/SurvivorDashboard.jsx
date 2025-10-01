import React, { useState, useContext } from "react";
import { 
  Home, 
  PlusCircle, 
  List, 
  Info, 
  User,
  MapPin,
  Phone,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Edit,
  Save,
  Camera,
  FileText,
  Heart,
  Zap,
  Users,
  Building,
  Truck
} from "lucide-react";

import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";

export default function SurvivorDashboard() {
  const { theme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('home');
  const [showReportForm, setShowReportForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: '',
    urgency: '',
    description: '',
    location: '',
    contactInfo: ''
  });

  // Mock data
  const [requests, setRequests] = useState([
    { id: 1, type: 'Shelter', status: 'Pending', date: '01-01-2025', urgency: 'High', description: 'Need temporary shelter for family of 4' },
    { id: 2, type: 'Food', status: 'Approved', date: '01-01-2025', urgency: 'Medium', description: 'Food supplies for 1 week' },
    { id: 3, type: 'Medical Supplies', status: 'Completed', date: '01-01-2025', urgency: 'High', description: 'First aid kit and medications' }
  ]);

  const [profile, setProfile] = useState({
    name: 'Emily Carter',
    phone: '+1 (555) 123-4567',
    email: 'emily.carter@email.com',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'John Carter - +1 (555) 987-6543',
    medicalInfo: 'No known allergies'
  });

  const [camps, setCamps] = useState([
    { id: 1, name: 'Community Relief Center', address: '123 Main St', services: ['Shelter', 'Food', 'Medical'], capacity: '80/100', distance: '2 miles' },
    { id: 2, name: 'Emergency Aid Station', address: '456 Oak Ave', services: ['Supplies', 'Information'], capacity: 'Full', distance: '5 miles' },
    { id: 3, name: 'Disaster Recovery Hub', address: '789 Pine St', services: ['Housing', 'Financial Aid'], capacity: '50/75', distance: '8 miles' }
  ]);

  const [alerts, setAlerts] = useState([
      { id: 1, title: 'Flash Flood Warning', severity: 'High', time: '2 hours ago', details: 'A flash flood warning is in effect for your area. Move to higher ground immediately.' },
      { id: 2, title: 'Boil Water Advisory', severity: 'Medium', time: '8 hours ago', details: 'A boil water advisory is in effect. Boil all water before consumption.' }
  ]);

  const HomeSection = () => (
    <div>
      <h2 className={`text-2xl font-bold drop-shadow mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Dashboard
      </h2>

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

  const ReportNeedSection = () => {
    const handleSubmitRequest = () => {
      if (newRequest.type && newRequest.urgency && newRequest.description) {
        const request = {
          id: requests.length + 1,
          type: newRequest.type,
          status: 'Pending',
          date: new Date().toLocaleDateString(),
          urgency: newRequest.urgency,
          description: newRequest.description
        };
        setRequests([...requests, request]);
        setNewRequest({ type: '', urgency: '', description: '', location: '', contactInfo: '' });
        alert('Request submitted successfully!');
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

  const RequestsSection = () => (
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
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  Submitted: {request.date}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EmergencyInfoSection = () => (
    <div>
      <h2 className={`text-2xl font-bold drop-shadow mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Emergency Information
      </h2>
      
      {/* Emergency Contacts */}
      <div className={`backdrop-blur border rounded-xl p-6 mb-6 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          <Phone className="w-5 h-5 text-red-600" />
          Emergency Contacts
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-red-200 bg-red-50" : "border-red-800 bg-red-900/20"}`}>
            <h4 className="font-medium text-red-700">Police</h4>
            <p className="text-2xl font-bold text-red-800">911</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-red-200 bg-red-50" : "border-red-800 bg-red-900/20"}`}>
            <h4 className="font-medium text-red-700">Fire Department</h4>
            <p className="text-2xl font-bold text-red-800">911</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-blue-200 bg-blue-50" : "border-blue-800 bg-blue-900/20"}`}>
            <h4 className="font-medium text-blue-700">Medical Emergency</h4>
            <p className="text-2xl font-bold text-blue-800">911</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-green-200 bg-green-50" : "border-green-800 bg-green-900/20"}`}>
            <h4 className="font-medium text-green-700">Disaster Relief</h4>
            <p className="text-2xl font-bold text-green-800">(555) 123-HELP</p>
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className={`backdrop-blur border rounded-xl p-6 mb-6 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          <Shield className="w-5 h-5 text-green-600" />
          Safety Tips
        </h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${theme === "light" ? "bg-yellow-50" : "bg-yellow-900/20"}`}>
            <h4 className="font-medium text-yellow-800">During a Disaster</h4>
            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
              <li>• Stay calm and follow evacuation orders</li>
              <li>• Keep emergency supplies readily available</li>
              <li>• Stay informed through official channels</li>
            </ul>
          </div>
          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}>
            <h4 className="font-medium text-blue-800">After a Disaster</h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Check for injuries and provide first aid</li>
              <li>• Avoid damaged areas and power lines</li>
              <li>• Document damage for insurance claims</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resource Centers */}
      <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
        theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
      }`}>
        <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          <Building className="w-5 h-5 text-indigo-600" />
          Nearby Resource Centers
        </h3>
        <div className="space-y-4">
          {[
            { name: "Community Relief Center", address: "123 Main St", services: "Shelter, Food, Medical" },
            { name: "Emergency Aid Station", address: "456 Oak Ave", services: "Supplies, Information" },
            { name: "Disaster Recovery Hub", address: "789 Pine St", services: "Housing, Financial Aid" }
          ].map((center, index) => (
            <div key={index} className={`p-4 rounded-lg border ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
              <h4 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>{center.name}</h4>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                <MapPin className="w-4 h-4 inline mr-1" />
                {center.address}
              </p>
              <p className={`text-sm mt-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Services: {center.services}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CampsSection = () => (
    <div>
      <h2 className={`text-2xl font-bold drop-shadow mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
        Nearby Relief Camps
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {camps.map(camp => (
          <div key={camp.id} className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
            theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
          }`}>
            <div className="flex justify-between items-start">
              <h3 className={`font-semibold text-lg ${theme === "light" ? "text-gray-900" : "text-white"}`}>{camp.name}</h3>
              <span className={`text-sm font-medium ${
                camp.capacity === 'Full' ? 'text-red-500' : 'text-green-500'
              }`}>{camp.capacity}</span>
            </div>
            <p className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              <MapPin className="w-4 h-4 inline mr-2" />{camp.address}
            </p>
            <p className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Distance: {camp.distance}
            </p>
            <div className="mt-4">
              <h4 className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Services Offered:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {camp.services.map(service => (
                  <span key={service} className={`px-2 py-1 text-xs rounded-full ${
                    theme === "light" ? "bg-indigo-100 text-indigo-700" : "bg-indigo-900/50 text-indigo-400"
                  }`}>{service}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileSection = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState({...profile});

    const handleSave = () => {
      setProfile({...editProfile});
      setIsEditing(false);
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold drop-shadow ${theme === "light" ? "text-black" : "text-white"}`}>
            Profile
          </h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
            theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
          }`}>
            <h3 className={`font-semibold text-lg mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={isEditing ? editProfile.name : profile.name}
                  onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing 
                      ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                      : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={isEditing ? editProfile.email : profile.email}
                  onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing 
                      ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                      : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
            theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
          }`}>
            <h3 className={`font-semibold text-lg mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Address Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Current Address
                </label>
                <textarea
                  value={isEditing ? editProfile.address : profile.address}
                  onChange={(e) => setEditProfile({...editProfile, address: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing 
                      ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                      : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
            theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
          }`}>
            <h3 className={`font-semibold text-lg mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Emergency Contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Emergency Contact Info
                </label>
                <input
                  type="text"
                  value={isEditing ? editProfile.emergencyContact : profile.emergencyContact}
                  onChange={(e) => setEditProfile({...editProfile, emergencyContact: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Name - Phone Number"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing 
                      ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                      : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
            theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
          }`}>
            <h3 className={`font-semibold text-lg mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Medical Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Medical Notes
                </label>
                <textarea
                  value={isEditing ? editProfile.medicalInfo : profile.medicalInfo}
                  onChange={(e) => setEditProfile({...editProfile, medicalInfo: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Allergies, medications, medical conditions..."
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing 
                      ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                      : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditProfile({...profile});
              }}
              className={`px-6 py-2 border rounded-lg transition ${
                theme === "light" ? "border-gray-300 hover:bg-gray-50" : "border-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HomeSection />;
      case 'report':
        return <ReportNeedSection />;
      case 'requests':
        return <RequestsSection />;
      case 'emergency':
        return <EmergencyInfoSection />;
      case 'camps':
        return <CampsSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`w-64 backdrop-blur border-r p-6 flex flex-col shadow-md ${
          theme === "light" 
            ? "bg-white/90 border-gray-200" 
            : "bg-gray-900/90 border-gray-700"
        }`}>
          {/* Profile */}
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Emily Carter
              </p>
              <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                Survivor
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveSection('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-left ${
                activeSection === 'home'
                  ? "bg-indigo-600 text-white font-medium shadow-md"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveSection('report')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-left ${
                activeSection === 'report'
                  ? "bg-indigo-600 text-white font-medium shadow-md"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <PlusCircle size={18} />
              <span>Report Need</span>
            </button>
            <button
              onClick={() => setActiveSection('requests')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-left ${
                activeSection === 'requests'
                  ? "bg-indigo-600 text-white font-medium shadow-md"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <List size={18} />
              <span>Requests</span>
            </button>
            <button
              onClick={() => setActiveSection('emergency')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-left ${
                activeSection === 'emergency'
                  ? "bg-indigo-600 text-white font-medium shadow-md"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <Info size={18} />
              <span>Emergency Info</span>
            </button>
            <button
              onClick={() => setActiveSection('camps')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-left ${
                activeSection === 'camps'
                  ? "bg-indigo-600 text-white font-medium shadow-md"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <Building size={18} />
              <span>Camps</span>
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-left ${
                activeSection === 'profile'
                  ? "bg-indigo-600 text-white font-medium shadow-md"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
