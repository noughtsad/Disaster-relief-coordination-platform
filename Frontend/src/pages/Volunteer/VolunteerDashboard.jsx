import React, { useState, useContext } from "react";
import {
  Home,
  Search,
  CheckSquare,
  MapPin,
  MessageCircle,
  User,
  Plus,
  Filter,
  Circle,
  Bell,
  Heart,
  Clock,
  Users,
  Activity,
  AlertTriangle,
  Send,
  Phone,
  Mail,
  Calendar,
  Check
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

// Mock data
const activeRequests = [
  {
    id: 1,
    type: "Community Cleanup",
    description: "Assist with debris removal and cleanup in the affected area.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80",
    location: "Downtown Area",
    urgency: "Medium",
    volunteers: 12
  }
];

const nearbyIncidents = [
  {
    id: 1,
    type: "Flood Relief",
    description: "Provide support to families affected by recent flooding.",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80",
    location: "Riverside District",
    urgency: "High",
    volunteers: 8
  }
];

const alerts = [
  {
    id: 1,
    type: "Safety Advisory",
    message: "Be cautious of hazardous materials in the affected areas.",
    icon: "warning",
    time: "2 hours ago"
  }
];

const availableRequests = [
  {
    id: 1,
    type: "Medical Aid",
    description: "Medical assistance needed in flood-affected area",
    icon: "medical",
    location: "North District",
    urgency: "High"
  },
  {
    id: 2,
    type: "Shelter Support",
    description: "Shelter and supplies needed for displaced families",
    icon: "shelter",
    location: "East Zone",
    urgency: "Medium"
  },
  {
    id: 3,
    type: "Food & Water",
    description: "Food and water distribution in affected area",
    icon: "food",
    location: "West Side",
    urgency: "High"
  },
  {
    id: 4,
    type: "Search & Rescue",
    description: "Search and rescue operations in remote areas",
    icon: "search",
    location: "Mountain Region",
    urgency: "Critical"
  },
  {
    id: 5,
    type: "Mental Health Support",
    description: "Psychological support for trauma victims",
    icon: "heart",
    location: "Community Center",
    urgency: "Medium"
  }
];

const assignedRequests = [
  {
    id: 1,
    type: "Medical Supplies Needed",
    requestId: "12345",
    status: "In Progress",
    updates: "Supplies are being gathered and will be ready for pickup by 2 PM.",
    communications: [
      {
        user: "Sarah Miller",
        time: "10:00 AM",
        message: "I've confirmed the availability of supplies. Please let me know if there are any changes.",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      {
        user: "David Lee",
        time: "10:15 AM",
        message: "Great, thank you for the update. I'll coordinate the pickup.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    ]
  },
  {
    id: 2,
    type: "Shelter Assistance",
    requestId: "67890",
    status: "Completed",
    updates: "Assistance provided and shelter setup confirmed.",
    communications: [
      {
        user: "Sarah Miller",
        time: "Yesterday, 4:30 PM",
        message: "Shelter assistance completed. All residents are safely accommodated.",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      {
        user: "Emily Chen",
        time: "Yesterday, 5:00 PM",
        message: "Thank you for your help, Sarah. It's greatly appreciated.",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    ]
  }
];

const communicationChats = [
  {
    id: 1,
    name: "Evacuation Team",
    lastMessage: "We're at the evacuation point.",
    time: "10:30 AM",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    unread: 2
  },
  {
    id: 2,
    name: "Supply Coordination",
    lastMessage: "Supplies are running low.",
    time: "9:45 AM",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    unread: 0
  },
  {
    id: 3,
    name: "Medical Team",
    lastMessage: "Need medical assistance.",
    time: "8:20 AM",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    unread: 1
  },
  {
    id: 4,
    name: "Search & Rescue",
    lastMessage: "Search and rescue in Sector 3.",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    unread: 0
  },
  {
    id: 5,
    name: "Shelter Management",
    lastMessage: "Shelter is at capacity.",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/38.jpg",
    unread: 0
  }
];

export default function VolunteerDashboard() {
  const { theme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to get icon component
  const getRequestIcon = (iconType) => {
    switch (iconType) {
      case 'medical':
        return <Plus className="w-5 h-5 text-blue-500" />;
      case 'shelter':
        return <Home className="w-5 h-5 text-green-500" />;
      case 'food':
        return <Circle className="w-5 h-5 text-orange-500" />;
      case 'search':
        return <Search className="w-5 h-5 text-red-500" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-pink-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  // Helper function to get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Home Section Component
  const HomeSection = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          Welcome, Alex
        </h1>
      </div>

      {/* Active Requests */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          Active Requests
        </h2>
        <div className="space-y-4">
          {activeRequests.map(request => (
            <div key={request.id} className={`p-6 rounded-xl shadow-sm border flex items-center justify-between ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
            }`}>
              <div className="flex items-center space-x-4">
                <img 
                  src={request.image} 
                  alt={request.type}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {request.type}
                  </h3>
                  <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {request.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`flex items-center text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      <MapPin className="w-3 h-3 mr-1" />
                      {request.location}
                    </span>
                    <span className={`flex items-center text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      <Users className="w-3 h-3 mr-1" />
                      {request.volunteers} volunteers
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                {request.urgency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Incidents */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          Nearby Incidents
        </h2>
        <div className="space-y-4">
          {nearbyIncidents.map(incident => (
            <div key={incident.id} className={`p-6 rounded-xl shadow-sm border flex items-center justify-between ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
            }`}>
              <div className="flex items-center space-x-4">
                <img 
                  src={incident.image} 
                  alt={incident.type}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {incident.type}
                  </h3>
                  <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {incident.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`flex items-center text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      <MapPin className="w-3 h-3 mr-1" />
                      {incident.location}
                    </span>
                    <span className={`flex items-center text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      <Users className="w-3 h-3 mr-1" />
                      {incident.volunteers} volunteers
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(incident.urgency)}`}>
                {incident.urgency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Alerts */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          Important Alerts
        </h2>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-6 rounded-xl shadow-sm border flex items-center justify-between ${
              theme === "light" ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-700"
            }`}>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {alert.type}
                  </h3>
                  <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Requests Section Component
  const RequestsSection = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        Available Requests
      </h1>
      
      <div className="space-y-4">
        {availableRequests.map(request => (
          <div key={request.id} className={`p-6 rounded-xl shadow-sm border flex items-center justify-between ${
            theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
          }`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {getRequestIcon(request.icon)}
              </div>
              <div>
                <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {request.type}
                </h3>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  {request.description}
                </p>
                <span className={`flex items-center text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  <MapPin className="w-3 h-3 mr-1" />
                  {request.location}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                {request.urgency}
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Assigned Section Component
  const AssignedSection = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        Assigned Requests
      </h1>
      
      <div className="space-y-6">
        {assignedRequests.map(request => (
          <div key={request.id} className={`p-6 rounded-xl shadow-sm border ${
            theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {request.type}
                </h3>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Request ID: {request.requestId}
                </p>
              </div>
              <div className="flex items-center">
                <Circle className="w-3 h-3 text-green-500 mr-2" />
                <span className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Active
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className={`font-medium mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Updates
              </h4>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                {request.updates}
              </p>
            </div>

            <div>
              <h4 className={`font-medium mb-3 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Communication Log
              </h4>
              <div className="space-y-3">
                {request.communications.map((comm, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <img 
                      src={comm.avatar} 
                      alt={comm.user}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-medium text-sm ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                          {comm.user}
                        </span>
                        <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                          {comm.time}
                        </span>
                      </div>
                      <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {comm.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Map Section Component
  const MapSection = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search for incidents or requests"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
            theme === "light" 
              ? "bg-gray-50 border-gray-300 focus:bg-white" 
              : "bg-gray-800 border-gray-600 text-white focus:bg-gray-700"
          } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
        />
      </div>

      {/* Map Placeholder */}
      <div className={`rounded-xl overflow-hidden shadow-sm border ${
        theme === "light" ? "border-gray-200" : "border-gray-700"
      }`}>
        <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map</h3>
            <p className="text-sm text-gray-500">
              Map showing locations of incidents, requests, and volunteers
            </p>
          </div>
          
          {/* Add floating action button */}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  // Communication Section Component
  const CommunicationSection = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        Communication
      </h1>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">
          Chats
        </button>
        <button className={`px-4 py-2 text-sm font-medium rounded-md ${
          theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-200"
        }`}>
          Groups
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search chats"
          className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
            theme === "light" 
              ? "bg-gray-50 border-gray-300 focus:bg-white" 
              : "bg-gray-800 border-gray-600 text-white focus:bg-gray-700"
          } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
        />
      </div>

      {/* Chat List */}
      <div className="space-y-2">
        {communicationChats.map(chat => (
          <div key={chat.id} className={`p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors ${
            theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-800"
          }`}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={chat.avatar} 
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{chat.unread}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {chat.name}
                  </h3>
                  <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                    {chat.time}
                  </span>
                </div>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} truncate`}>
                  Last message: "{chat.lastMessage}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Profile Section Component
  const ProfileSection = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        Profile
      </h1>
      <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
        Manage your profile information
      </p>
      
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Full Name
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Email
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Phone Number
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Address
          </label>
          <textarea
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            City
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            State
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Zip Code
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg ${
              theme === "light" 
                ? "bg-white border-gray-300" 
                : "bg-gray-800 border-gray-600 text-white"
            } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
          />
        </div>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Update Profile
        </button>
      </div>
    </div>
  );

  // Render section based on active selection
  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HomeSection />;
      case 'requests':
        return <RequestsSection />;
      case 'assigned':
        return <AssignedSection />;
      case 'map':
        return <MapSection />;
      case 'communication':
        return <CommunicationSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      {/* Top Navigation */}
      <nav className={`px-6 py-4 border-b flex items-center justify-between ${
        theme === "light" 
          ? "bg-white border-gray-200" 
          : "bg-gray-800 border-gray-700"
      }`}>
        <h1 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          CrisisConnect
        </h1>
        <div className="flex items-center space-x-4">
          <button className={`px-4 py-2 text-sm font-medium rounded-lg ${
            theme === "light" 
              ? "text-gray-600 hover:text-gray-900" 
              : "text-gray-400 hover:text-gray-200"
          }`}>
            About
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Donate
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen border-r px-4 py-6 ${
          theme === "light" 
            ? "bg-white border-gray-200" 
            : "bg-gray-800 border-gray-700"
        }`}>
          {/* Profile Section */}
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Rudra"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Rudra
              </h2>
              <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                Volunteer
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('home')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'home'
                  ? 'bg-blue-50 text-blue-600'
                  : theme === "light"
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveSection('requests')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'requests'
                  ? 'bg-blue-50 text-blue-600'
                  : theme === "light"
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Requests</span>
            </button>

            <button
              onClick={() => setActiveSection('assigned')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'assigned'
                  ? 'bg-blue-50 text-blue-600'
                  : theme === "light"
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span>Assigned</span>
            </button>

            <button
              onClick={() => setActiveSection('map')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'map'
                  ? 'bg-blue-50 text-blue-600'
                  : theme === "light"
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Map</span>
            </button>

            <button
              onClick={() => setActiveSection('communication')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'communication'
                  ? 'bg-blue-50 text-blue-600'
                  : theme === "light"
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Communication</span>
            </button>

            <button
              onClick={() => setActiveSection('profile')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'profile'
                  ? 'bg-blue-50 text-blue-600'
                  : theme === "light"
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
