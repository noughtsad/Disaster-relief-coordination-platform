import React, { useContext } from "react";
import { Phone, Shield, Building, MapPin } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const EmergencyInfoSection = () => {
  const { theme } = useContext(ThemeContext);

  return (
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
            <p className="text-2xl font-bold text-red-800">100</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-red-200 bg-red-50" : "border-red-800 bg-red-900/20"}`}>
            <h4 className="font-medium text-red-700">Fire Department</h4>
            <p className="text-2xl font-bold text-red-800">101</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-blue-200 bg-blue-50" : "border-blue-800 bg-blue-900/20"}`}>
            <h4 className="font-medium text-blue-700">Medical Emergency</h4>
            <p className="text-2xl font-bold text-blue-800">108</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "light" ? "border-green-200 bg-green-50" : "border-green-800 bg-green-900/20"}`}>
            <h4 className="font-medium text-green-700">Disaster Relief</h4>
            <p className="text-2xl font-bold text-green-800">112</p>
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
};

export default EmergencyInfoSection;