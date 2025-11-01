import React, { useContext, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Award,
  Heart,
  MessageCircle // Import MessageCircle icon
} from "lucide-react";
import { motion } from 'framer-motion';
import { ThemeContext } from "../../context/ThemeContext";
import ChatModal from '../../components/ChatModal'; // Import ChatModal

const HomeSection = ({ volunteerProfile, schedule: initialSchedule, opportunities, handleApplyForOpportunity }) => {
  const { theme } = useContext(ThemeContext);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [schedule, setSchedule] = useState(initialSchedule);

  const openChatModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedRequestId(null);
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="bg-blue-50 p-6 rounded-lg border border-blue-100"
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 }
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600' : 'text-blue-900'}`}>Total Hours</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-900'}`}>{volunteerProfile.totalHours}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-green-50 p-6 rounded-lg border border-green-100"
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 }
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-green-600' : 'text-green-900'}`}>Completed Tasks</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-green-600' : 'text-green-900'}`}>{volunteerProfile.completedTasks}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-yellow-50 p-6 rounded-lg border border-yellow-100"
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 }
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-yellow-600' : 'text-yellow-900'}`}>Rating</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-yellow-600' : 'text-yellow-900'}`}>{volunteerProfile.rating}/5</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-purple-50 p-6 rounded-lg border border-purple-100"
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 }
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>Experience</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-purple-900' : 'text-purple-100'}`}>{volunteerProfile.experience}</p>
            </div>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white' : 'bg-gray-800 border-gray-700'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
            Upcoming Schedule
          </h3>
          <div className="space-y-4">
            {schedule.slice(0, 3).map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <div>
                  <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.title}</p>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.date} • {item.time}</p>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{item.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                  {item.chatEnabled && (
                    <button 
                      onClick={() => openChatModal(item.requestId)}
                      className="p-1 rounded-full text-indigo-600 hover:bg-indigo-100 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white' : 'bg-gray-800 border-gray-700'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            Available Opportunities
          </h3>
          <div className="space-y-4">
            {opportunities.slice(0, 3).map((opp) => (
              <div key={opp.id} className={`p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{opp.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opp.urgency === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {opp.urgency}
                  </span>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{opp.organization}</p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{opp.date} • {opp.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {opp.volunteers_registered}/{opp.volunteers_needed} volunteers
                  </span>
                  <button 
                    onClick={() => handleApplyForOpportunity(opp.id)}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedRequestId && (
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={closeChatModal}
          requestId={selectedRequestId}
          theme={theme} // Pass theme prop
        />
      )}
    </motion.div>
  );
};

export default HomeSection;