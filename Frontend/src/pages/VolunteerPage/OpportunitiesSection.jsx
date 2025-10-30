import React, { useContext } from "react";
import { 
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  Users
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import MapComponent from "../../components/Map";

const OpportunitiesSection = ({ 
  opportunities, 
  searchTerm, 
  setSearchTerm, 
  setSelectedOpportunity, 
  handleApplyForOpportunity 
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Available Opportunities</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
            />
          </div>
          <button className={`flex items-center justify-center px-3 sm:px-4 py-2 border rounded-lg text-sm ${theme === 'light' ? 'border-gray-300 hover:bg-gray-50 text-gray-700' : 'border-gray-600 hover:bg-gray-700 text-gray-300'}`}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className={`p-4 sm:p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div>
                <h3 className={`text-base sm:text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{opp.title}</h3>
                <p className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{opp.organization}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                opp.urgency === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : opp.urgency === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {opp.urgency} priority
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Calendar className="mr-2 h-4 w-4" />
                {opp.date} • {opp.time}
              </div>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <MapPin className="mr-2 h-4 w-4" />
                {opp.location}
              </div>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Clock className="mr-2 h-4 w-4" />
                {opp.duration}
              </div>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Users className="mr-2 h-4 w-4" />
                {opp.volunteers_registered}/{opp.volunteers_needed} volunteers
              </div>
            </div>

            <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-4`}>{opp.description}</p>

            <div className="mb-4">
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Requirements:</p>
              <ul className={`list-disc list-inside text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                {opp.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Category: {opp.category}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedOpportunity(opp)}
                  className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleApplyForOpportunity(opp.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        <MapComponent />
    </div>
  );
};

export default OpportunitiesSection;