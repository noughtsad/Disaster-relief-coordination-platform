import React, { useContext } from "react";
import { 
  Plus,
  Edit,
  Calendar,
  Clock,
  MapPin
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const ScheduleSection = ({ schedule }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>My Schedule</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className={`rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <div className="p-6">
          <div className="space-y-4">
            {schedule.map((item) => (
              <div key={item.id} className={`rounded-lg p-4 hover:shadow-sm transition-shadow ${theme === 'light' ? 'border border-gray-200' : 'border border-gray-600 bg-gray-700'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                    <button className={`hover:text-gray-600 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className={`flex items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.date}
                  </div>
                  <div className={`flex items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <Clock className="mr-2 h-4 w-4" />
                    {item.time}
                  </div>
                  <div className={`flex items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <MapPin className="mr-2 h-4 w-4" />
                    {item.location}
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Organization: {item.organization}</p>
                  <div className="flex space-x-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800">Contact</button>
                    <button className="text-sm text-red-600 hover:text-red-800">Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;