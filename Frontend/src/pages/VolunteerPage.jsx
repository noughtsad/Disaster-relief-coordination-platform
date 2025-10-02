import React, { useState, useContext, useEffect } from "react";
import {
  Home,
  Calendar,
  List,
  User,
  MapPin,
  Clock,
  Users,
  Heart,
  Award,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  Phone,
  Mail,
  Edit,
  Save,
  Camera,
  Trash2,
  AlertCircle,
  BookOpen,
  Shield,
  Activity
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";

export default function VolunteerPage() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);

  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

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

  const renderHome = () => (
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
              <p className="text-sm font-medium text-blue-600">Total Hours</p>
              <p className="text-2xl font-bold text-blue-900">{volunteerProfile.totalHours}</p>
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
              <p className="text-sm font-medium text-green-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-green-900">{volunteerProfile.completedTasks}</p>
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
              <p className="text-sm font-medium text-yellow-600">Rating</p>
              <p className="text-2xl font-bold text-yellow-900">{volunteerProfile.rating}/5</p>
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
              <p className="text-sm font-medium text-purple-600">Experience</p>
              <p className="text-2xl font-bold text-purple-900">{volunteerProfile.experience}</p>
            </div>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
            Upcoming Schedule
          </h3>
          <div className="space-y-4">
            {schedule.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.date} • {item.time}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            Available Opportunities
          </h3>
          <div className="space-y-4">
            {opportunities.slice(0, 3).map((opp) => (
              <div key={opp.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{opp.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opp.urgency === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {opp.urgency}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{opp.organization}</p>
                <p className="text-sm text-gray-500">{opp.date} • {opp.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
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
    </motion.div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Opportunities</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{opp.title}</h3>
                <p className="text-gray-600">{opp.organization}</p>
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
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                {opp.date} • {opp.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4" />
                {opp.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2 h-4 w-4" />
                {opp.duration}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                {opp.volunteers_registered}/{opp.volunteers_needed} volunteers
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">{opp.description}</p>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {opp.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Category: {opp.category}</span>
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
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Schedule</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="space-y-4">
            {schedule.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
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
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {item.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {item.location}
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600">Organization: {item.organization}</p>
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

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training & Certification</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse Courses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainingModules.map((module) => (
          <div key={module.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <p className="text-gray-600">Duration: {module.duration}</p>
              </div>
              <div className="flex items-center space-x-2">
                {module.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-gray-400" />
                )}
                {module.certificate && (
                  <Award className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">{module.description}</p>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {module.completed ? 'Completed' : 'Available'}
              </span>
              
              <div className="flex space-x-2">
                {module.completed ? (
                  <>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View Certificate</button>
                    <button className="text-sm text-green-600 hover:text-green-800">Retake</button>
                  </>
                ) : (
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start Course
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Volunteer Profile</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={volunteerProfile.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={volunteerProfile.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={volunteerProfile.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              value={volunteerProfile.experience}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={volunteerProfile.address}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {volunteerProfile.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <div className="flex flex-wrap gap-2">
              {volunteerProfile.availability.map((time, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
        return renderHome();
      case 'opportunities':
        return renderOpportunities();
      case 'schedule':
        return renderSchedule();
      case 'training':
        return renderTraining();
      case 'profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 min-h-screen shadow-sm ${
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
                  onClick={() => setActiveSection(item.id)}
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
        <div className="flex-1 p-8">
          {renderContent()}
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