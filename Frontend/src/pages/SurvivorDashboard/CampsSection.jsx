import React, { useContext, useState } from "react";
import { MapPin } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const CampsSection = () => {
  const { theme } = useContext(ThemeContext);
  
  const [camps] = useState([
    { id: 1, name: 'Community Relief Center', address: '123 Main St', services: ['Shelter', 'Food', 'Medical'], capacity: '80/100', distance: '2 miles' },
    { id: 2, name: 'Emergency Aid Station', address: '456 Oak Ave', services: ['Supplies', 'Information'], capacity: 'Full', distance: '5 miles' },
    { id: 3, name: 'Disaster Recovery Hub', address: '789 Pine St', services: ['Housing', 'Financial Aid'], capacity: '50/75', distance: '8 miles' }
  ]);

  return (
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
};

export default CampsSection;