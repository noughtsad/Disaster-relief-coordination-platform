import React, { useState, useContext, useEffect } from "react";
import {
  Home,
  Calendar,
  User,
  Heart,
  BookOpen,
  XCircle,
  Menu,
  X
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ThemeContext } from "../../context/ThemeContext";

// Import all sections
import HomeSection from './HomeSection';
import OpportunitiesSection from './OpportunitiesSection';
import ScheduleSection from './ScheduleSection';
import TrainingSection from './TrainingSection';
import ProfileSection from './ProfileSection';

export default function VolunteerPage() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);

  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Volunteer profile state
  const [volunteerProfile, setVolunteerProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Volunteer Street, Helper City, HC 67890",
    skills: ["First Aid", "Communication", "Event Planning", "Languages"],
    availability: ["Weekends", "Evenings"],
    experience: "2 years",
    totalHours: 156,
    rating: 4.8,
    completedTasks: 23
  });

  // Mock data for opportunities
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Disaster Relief Support",
      organization: "Red Cross",
      location: "Downtown Relief Center",
      date: "2025-10-05",
      time: "09:00 AM - 5:00 PM",
      duration: "8 hours",
      volunteers_needed: 10,
      volunteers_registered: 6,
      category: "Emergency Response",
      description: "Help distribute supplies and provide support to disaster victims.",
      requirements: ["First Aid Certificate", "Physical fitness"],
      status: "open",
      urgency: "high"
    },
    {
      id: 2,
      title: "Community Kitchen Service",
      organization: "Local Food Bank",
      location: "Community Center",
      date: "2025-10-07",
      time: "6:00 AM - 2:00 PM",
      duration: "8 hours",
      volunteers_needed: 8,
      volunteers_registered: 5,
      category: "Food Service",
      description: "Prepare and serve meals for families in need.",
      requirements: ["Food handling training preferred"],
      status: "open",
      urgency: "medium"
    },
    {
      id: 3,
      title: "Medical Camp Assistant",
      organization: "Health Care United",
      location: "Mobile Medical Unit",
      date: "2025-10-10",
      time: "8:00 AM - 4:00 PM",
      duration: "8 hours",
      volunteers_needed: 15,
      volunteers_registered: 12,
      category: "Healthcare",
      description: "Assist medical professionals in providing healthcare services.",
      requirements: ["Basic medical knowledge", "Compassionate attitude"],
      status: "open",
      urgency: "medium"
    }
  ]);

  // Mock data for volunteer schedule
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      title: "Shelter Management",
      date: "2025-10-05",
      time: "9:00 AM - 5:00 PM",
      location: "Emergency Shelter #3",
      status: "confirmed",
      organization: "Disaster Relief Org"
    },
    {
      id: 2,
      title: "Supply Distribution",
      date: "2025-10-08",
      time: "2:00 PM - 6:00 PM",
      location: "Community Center",
      status: "pending",
      organization: "Local Aid Group"
    }
  ]);

  // Mock training modules
  const [trainingModules, setTrainingModules] = useState([
    {
      id: 1,
      title: "Emergency Response Basics",
      duration: "2 hours",
      completed: true,
      certificate: true,
      description: "Learn fundamental emergency response procedures"
    },
    {
      id: 2,
      title: "First Aid & CPR",
      duration: "4 hours",
      completed: true,
      certificate: true,
      description: "Essential first aid and CPR certification"
    },
    {
      id: 3,
      title: "Disaster Communication",
      duration: "1.5 hours",
      completed: false,
      certificate: false,
      description: "Effective communication during disasters"
    },
    {
      id: 4,
      title: "Psychological First Aid",
      duration: "3 hours",
      completed: false,
      certificate: false,
      description: "Providing emotional support to disaster victims"
    }
  ]);

  const handleApplyForOpportunity = (opportunityId) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, volunteers_registered: opp.volunteers_registered + 1 }
        : opp
    ));
    alert("Successfully applied for opportunity!");
  };

  const handleWithdrawApplication = (opportunityId) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, volunteers_registered: Math.max(0, opp.volunteers_registered - 1) }
        : opp
    ));
    alert("Application withdrawn successfully!");
  };

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, count: null },
    { id: 'opportunities', label: 'Opportunities', icon: Heart, count: opportunities.length },
    { id: 'schedule', label: 'My Schedule', icon: Calendar, count: schedule.length },
    { id: 'training', label: 'Training', icon: BookOpen, count: trainingModules.filter(m => !m.completed).length },
    { id: 'profile', label: 'Profile', icon: User, count: null },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection 
          volunteerProfile={volunteerProfile} 
          schedule={schedule} 
          opportunities={opportunities} 
          handleApplyForOpportunity={handleApplyForOpportunity} 
        />;
      case 'opportunities':
        return <OpportunitiesSection 
          opportunities={opportunities} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setSelectedOpportunity={setSelectedOpportunity} 
          handleApplyForOpportunity={handleApplyForOpportunity} 
        />;
      case 'schedule':
        return <ScheduleSection schedule={schedule} />;
      case 'training':
        return <TrainingSection trainingModules={trainingModules} />;
      case 'profile':
        return <ProfileSection volunteerProfile={volunteerProfile} />;
      default:
        return <HomeSection 
          volunteerProfile={volunteerProfile} 
          schedule={schedule} 
          opportunities={opportunities} 
          handleApplyForOpportunity={handleApplyForOpportunity} 
        />;
    }
  };

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg shadow-lg ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 min-h-screen shadow-sm transition-transform duration-300 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {volunteerProfile.name}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Volunteer
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-6">
            <div className="px-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? theme === 'light'
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'bg-blue-900 text-blue-100'
                      : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </div>
                  {item.count && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeSection === item.id
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedOpportunity.title}</h2>
                <button 
                  onClick={() => setSelectedOpportunity(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Organization</h3>
                  <p className="text-gray-600">{selectedOpportunity.organization}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-600">{selectedOpportunity.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Date & Time</h3>
                    <p className="text-gray-600">{selectedOpportunity.date}</p>
                    <p className="text-gray-600">{selectedOpportunity.time}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{selectedOpportunity.location}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedOpportunity.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">
                      {selectedOpportunity.volunteers_registered}/{selectedOpportunity.volunteers_needed} volunteers registered
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setSelectedOpportunity(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    <button 
                      onClick={() => {
                        handleApplyForOpportunity(selectedOpportunity.id);
                        setSelectedOpportunity(null);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}