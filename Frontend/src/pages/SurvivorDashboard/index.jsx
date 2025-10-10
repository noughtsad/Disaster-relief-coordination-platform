import React, { useState, useContext, useEffect } from "react";
import { 
  Home, 
  PlusCircle, 
  List, 
  Info, 
  User,
  Building,
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/appSlice';
import { ThemeContext } from "../../context/ThemeContext";

// Import all sections
import HomeSection from './HomeSection';
import ReportNeedSection from './ReportNeedSection';
import RequestsSection from './RequestsSection';
import EmergencyInfoSection from './EmergencyInfoSection';
import CampsSection from './CampsSection';
import ProfileSection from './ProfileSection';

export default function SurvivorDashboard() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user: profile } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.app);

  const [activeSection, setActiveSection] = useState('home');

  const [alerts] = useState([
      { id: 1, title: 'Flash Flood Warning', severity: 'High', time: '2 hours ago', details: 'A flash flood warning is in effect for your area. Move to higher ground immediately.' },
      { id: 2, title: 'Boil Water Advisory', severity: 'Medium', time: '8 hours ago', details: 'A boil water advisory is in effect. Boil all water before consumption.' }
  ]);

  useEffect(() => {
    if (user && user.name && profile.name !== user.name) {
      dispatch(setUser({ name: user.name, email: user.email }));
    }
  }, [dispatch, user, profile]);

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HomeSection setActiveSection={setActiveSection} alerts={alerts} />;
      case 'report':
        return <ReportNeedSection />;
      case 'requests':
        return <RequestsSection setActiveSection={setActiveSection} />;
      case 'emergency':
        return <EmergencyInfoSection />;
      case 'camps':
        return <CampsSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeSection setActiveSection={setActiveSection} alerts={alerts} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=000000&color=ffffff`}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                {profile.name}
              </p>
              <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                {user?.userType || 'Survivor'}
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