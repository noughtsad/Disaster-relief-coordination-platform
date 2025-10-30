import React, { useState, useContext, useEffect } from "react";
import {
  Home,
  Heart,
  List,
  BarChart2,
  MessageSquare,
  User,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchNgoProfile } from '../../store/ngoSlice';
import { ThemeContext } from "../../context/ThemeContext";

// Import all section components
import HomeSection from './HomeSection';
import ManageDonationsSection from './ManageDonationsSection';
import ViewRequestsSection from './ViewRequestsSection';
import CommunicationsSection from './CommunicationsSection';
import ProfileSection from './ProfileSection';
import ImpactTrackingSection from './ImpactTrackingSection';

export default function NgoDashboard() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { ngoProfile } = useSelector((state) => state.ngo);
  const { user } = useSelector((state) => state.app);

  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchNgoProfile(user._id));
    }
  }, [dispatch, user?._id]);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "donations":
        return <ManageDonationsSection />;
      case "requests":
        return <ViewRequestsSection />;
      case "impact":
        return <ImpactTrackingSection />;
      case "communications":
        return <CommunicationsSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`flex flex-1 overflow-hidden ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
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

        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 backdrop-blur border-r p-6 flex flex-col shadow-md transition-transform duration-300 ${
            theme === "light"
              ? "bg-white/90 border-gray-200"
              : "bg-gray-900/90 border-gray-700"
          }`}
        >
          <div
            className={`flex items-center px-6 py-4 border-b ${
              theme === "light" ? "border-gray-200" : "border-gray-700"
            }`}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${ngoProfile.ngoName}&background=000000&color=ffffff`}
              alt="NGO Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h2
                className={`font-semibold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {ngoProfile.ngoName || 'NGO Name'}
              </h2>
              <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                {user?.name || 'NGO Owner'}
              </span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-4">
            <button
              onClick={() => {
                setActiveSection("home");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "home"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <Home className="w-5 h-5 mr-3" /> Home
            </button>
            <button
              onClick={() => {
                setActiveSection("donations");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "donations"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <Heart className="w-5 h-5 mr-3" /> Manage Donations
            </button>
            <button
              onClick={() => {
                setActiveSection("requests");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "requests"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <List className="w-5 h-5 mr-3" /> View Requests
            </button>
            <button
              onClick={() => {
                setActiveSection("impact");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "impact"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <BarChart2 className="w-5 h-5 mr-3" /> Impact Tracking
            </button>
            <button
              onClick={() => {
                setActiveSection("communications");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "communications"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-3" /> Communications
            </button>
            <button
              onClick={() => {
                setActiveSection("profile");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "profile"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <User className="w-5 h-5 mr-3" /> Profile
            </button>
          </nav>
          <div className="p-4">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              New Campaign
            </button>
            <p
              className={`text-sm mt-3 text-center ${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Help and Docs
            </p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Dashboard */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}