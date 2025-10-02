import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../store/appSlice';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.app);

  // Check if user is on dashboard pages where logo shouldn't navigate away
  const isDashboardPage = location.pathname === '/volunteer' || 
                          location.pathname === '/survivorDashboard' || 
                          location.pathname === '/ngoDashboard';

  const handleLogoClick = () => {
    if (!isDashboardPage) {
      navigate('/');
    }
  };

  return (
    <nav
      className={`flex justify-between items-center px-8 py-6 shadow-sm transition-colors ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-gray-900 text-white"
      }`}
    >
      <h1 
        onClick={handleLogoClick}
        className={`text-3xl font-bold ${
          isDashboardPage 
            ? 'cursor-default' 
            : 'cursor-pointer hover:text-blue-600 transition-colors'
        }`}
      >
        CrisisConnect
      </h1>

      <div className="flex items-center gap-6">
        {/* Navigation Buttons */}
        {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                const userType = localStorage.getItem('userType');
                if (userType === 'ngo') {
                  navigate('/ngoDashboard');
                } else if (userType === 'volunteer') {
                  navigate('/volunteer');
                } else {
                  navigate('/survivorDashboard');
                }
              }}
              className={`px-6 py-3 font-medium transition-colors ${
                theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/volunteer')}
              className={`px-6 py-3 font-medium transition-colors ${
                theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Volunteer
            </button>
            <button
              onClick={() => navigate('/profile')}
              className={`px-6 py-3 font-medium transition-colors ${
                theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => {
                dispatch(logoutUser());
                navigate('/');
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
                theme === "light"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-gray-900 hover:bg-red-400"
              }`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/signup')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
                theme === "light"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-gray-900 hover:bg-blue-400"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => navigate('/login')}
              className={`px-6 py-3 font-medium transition-colors ${
                theme === "light"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Login
            </button>
          </>
        )}
        <button
          onClick={() => navigate('/donate')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
            theme === "light"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-gray-900 hover:bg-blue-400"
          }`}
        >
          Donate
        </button>
        <button
          onClick={() => navigate('/about')}
          className={`px-6 py-3 font-medium transition-colors ${
            theme === "light"
              ? "text-gray-700 hover:text-gray-900"
              : "text-gray-300 hover:text-white"
          }`}
        >
          About
        </button>

        {/* Theme Toggle Button */}
        <button
          className={`p-2 rounded-full transition-colors ${
            theme === "light"
              ? "hover:bg-gray-100"
              : "hover:bg-gray-800"
          }`}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Sun size={20} className="text-gray-600" />
          ) : (
            <Moon size={20} className="text-gray-300" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
