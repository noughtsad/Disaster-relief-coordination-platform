 import { useContext, useState } from "react";
import { Sun, Moon, Menu, X, Home } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../store/appSlice";

const Navbar = ({ user, isAuthenticated }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to get dashboard route based on user type
  const getDashboardRoute = () => {
    if (!user) return "/";
    
    const userType = user.userType?.toLowerCase(); // Handle case sensitivity
    
    switch (userType) {
      case "survivor":
        return "/survivorDashboard";
      case "ngo":
        return "/ngoDashboard";
      case "volunteer":
        return "/volunteer";
      case "supplier":
        return "/supplierDashboard";
      default:
        return "/";
    }
  };

  const handleLogoClick = () => {
    console.log("Logo clicked! User:", user); // Debug log
    console.log("isAuthenticated:", isAuthenticated); // Debug log
    
    if (isAuthenticated && user) {
      const route = getDashboardRoute();
      console.log("Navigating to:", route); // Debug log
      navigate(route);
    } else {
      console.log("Navigating to landing page"); // Debug log
      navigate("/");
    }
  };

  // Pill Nav styling based on active route
  const getPillNavClass = (path) => {
    const isActive = location.pathname === path;
    return `relative px-4 py-2 rounded-full font-medium transition-all duration-200 ${
      isActive
        ? theme === "light"
          ? "bg-blue-100 text-blue-700"
          : "bg-blue-900/50 text-blue-300"
        : theme === "light"
        ? "text-gray-700 hover:bg-gray-100"
        : "text-gray-300 hover:bg-gray-800"
    }`;
  };

  const getActivePillClass = (path) => {
    const isActive = location.pathname === path;
    return `relative px-3 lg:px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm lg:text-base transform hover:scale-105 active:scale-95 ${
      isActive
        ? theme === "light"
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40"
          : "bg-blue-500 text-gray-900 shadow-lg shadow-blue-500/30 hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-500/40"
        : theme === "light"
        ? "text-gray-700 hover:bg-gray-200 hover:shadow-md"
        : "text-gray-300 hover:bg-gray-700 hover:shadow-md"
    }`;
  };


  return (
    <nav
      className={`relative flex justify-between items-center px-4 md:px-8 py-4 md:py-6 shadow-sm transition-colors ${
        theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      <img onClick={handleLogoClick} src="/logo_name.png" alt="CrisisConnect Logo" className="h-12 cursor-pointer" />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
        }`}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation with Pill Nav */}
      <div className="hidden md:flex items-center gap-2 lg:gap-3">
        {/* Navigation Pills Container */}
        <div className={`flex items-center gap-1 p-1 rounded-full ${
          theme === "light" ? "bg-gray-100/80" : "bg-gray-800/50"
        }`}>
          {/* Home Pill */}
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate("/")}
              className={getActivePillClass("/")}
            >
              <span className="flex items-center gap-2">
                <Home size={18} />
                <span>Home</span>
              </span>
            </button>
          )}
          
          {/* Dashboard Pills */}
          {isAuthenticated && location.pathname !== "/" && (
            <>
              {(user?.userType === "ngo" || location.pathname === "/ngoDashboard") && (
                <button
                  onClick={() => navigate("/ngoDashboard")}
                  className={getActivePillClass("/ngoDashboard")}
                >
                  Dashboard
                </button>
              )}

              {(user?.userType === "survivor" || location.pathname === "/survivorDashboard") && (
                <button
                  onClick={() => navigate("/survivorDashboard")}
                  className={getActivePillClass("/survivorDashboard")}
                >
                  Dashboard
                </button>
              )}

              {(user?.userType === "volunteer" || location.pathname === "/volunteer") && (
                <button
                  onClick={() => navigate("/volunteer")}
                  className={getActivePillClass("/volunteer")}
                >
                  Volunteer
                </button>
              )}

              {(user?.userType === "Supplier" || location.pathname === "/supplierDashboard") && (
                <button
                  onClick={() => navigate("/supplierDashboard")}
                  className={getActivePillClass("/supplierDashboard")}
                >
                  Dashboard
                </button>
              )}
            </>
          )}

          {/* Donate Pill */}
          {location.pathname !== "/volunteer" && (
            <button
              onClick={() => navigate("/donate")}
              className={getActivePillClass("/donate")}
            >
              Donate
            </button>
          )}

          {/* About Pill */}
          <button
            onClick={() => navigate("/about")}
            className={getActivePillClass("/about")}
          >
            About
          </button>
        </div>

        {/* Auth Buttons (Outside Pill Container) */}
        <div className="flex items-center gap-2 ml-2">
          {isAuthenticated ? (
            location.pathname !== "/" && (
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 shadow-sm text-sm lg:text-base transform hover:scale-105 active:scale-95 ${
                  theme === "light"
                    ? "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30"
                    : "bg-red-500 text-gray-900 hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/30"
                }`}
              >
                Logout
              </button>
            )
          ) : (
            location.pathname === "/" && (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 shadow-sm text-sm lg:text-base transform hover:scale-105 active:scale-95 ${
                    theme === "light"
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                      : "bg-blue-500 text-gray-900 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 text-sm lg:text-base transform hover:scale-105 active:scale-95 ${
                    theme === "light"
                      ? "text-gray-700 hover:bg-gray-200 hover:shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:shadow-md"
                  }`}
                >
                  Login
                </button>
              </>
            )
          )}

          {/* Theme Toggle Button */}
          <button
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-95 ${
              theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
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
      </div>

      {/* Mobile Menu (Keep existing mobile menu code) */}
      {isMobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 md:hidden shadow-2xl border-t z-50 ${
          theme === "light" ? "bg-white border-gray-200 shadow-black/20" : "bg-gray-900 border-gray-700 shadow-black/60"
        }`}>
          <div className="flex flex-col p-4 space-y-2">
            {/* Home Button for Mobile - Only show if NOT logged in and not on landing page */}
            {!isAuthenticated && location.pathname !== "/" && (
              <button
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:translate-x-1 active:scale-95 ${
                  location.pathname === "/"
                    ? theme === "light"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-900/50 text-blue-300"
                    : theme === "light"
                    ? "hover:bg-gray-200 text-gray-700 hover:shadow-md"
                    : "hover:bg-gray-700 text-gray-300 hover:shadow-md"
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            )}
            
            {/* Navigation Buttons */}
            {isAuthenticated ? (
              <>
                {location.pathname !== "/" && (
                  <>
                    {(user?.userType === "ngo" || location.pathname === "/ngoDashboard") && (
                      <button
                        onClick={() => {
                          navigate("/ngoDashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                          location.pathname === "/ngoDashboard"
                            ? theme === "light"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-900/50 text-blue-300"
                            : theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Dashboard
                      </button>
                    )}

                    {(user?.userType === "survivor" || location.pathname === "/survivorDashboard") && (
                      <button
                        onClick={() => {
                          navigate("/survivorDashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                          location.pathname === "/survivorDashboard"
                            ? theme === "light"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-900/50 text-blue-300"
                            : theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Dashboard
                      </button>
                    )}

                    {(user?.userType === "volunteer" || location.pathname === "/volunteer") && (
                      <button
                        onClick={() => {
                          navigate("/volunteer");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                          location.pathname === "/volunteer"
                            ? theme === "light"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-900/50 text-blue-300"
                            : theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Volunteer
                      </button>
                    )}

                    {(user?.userType === "Supplier" || location.pathname === "/supplierDashboard") && (
                      <button
                        onClick={() => {
                          navigate("/supplierDashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                          location.pathname === "/supplierDashboard"
                            ? theme === "light"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-900/50 text-blue-300"
                            : theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                        navigate("/");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 shadow-sm ${
                        theme === "light"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-red-500 text-gray-900 hover:bg-red-400"
                      }`}
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            ) : (
              location.pathname === "/" && (
                <>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 shadow-sm ${
                      theme === "light"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-gray-900 hover:bg-blue-400"
                    }`}
                  >
                    Register
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                      theme === "light"
                        ? "hover:bg-gray-100 text-gray-700"
                        : "hover:bg-gray-800 text-gray-300"
                    }`}
                  >
                    Login
                  </button>
                </>
              )
            )}
            {location.pathname !== "/volunteer" && (
              <button
                onClick={() => {
                  navigate("/donate");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                  location.pathname === "/donate"
                    ? theme === "light"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-900/50 text-blue-300"
                    : theme === "light"
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                Donate
              </button>
            )}
            <button
              onClick={() => {
                navigate("/about");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                location.pathname === "/about"
                  ? theme === "light"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-blue-900/50 text-blue-300"
                  : theme === "light"
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              About
            </button>

            <button
              className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-3 ${
                theme === "light"
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <>
                  <Sun size={20} className="text-gray-600" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} className="text-gray-300" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
