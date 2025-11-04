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

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav
      className={`relative flex justify-between items-center px-4 md:px-8 py-4 md:py-6 shadow-sm transition-colors ${
        theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      <h1
        onClick={handleLogoClick}
        className="text-xl md:text-3xl font-bold cursor-pointer hover:text-blue-600 transition-colors"
      >
        CrisisConnect
      </h1>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        {/* Home Button */}
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
              theme === "light"
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
        )}
        
        {/* Navigation Buttons */}
        {isAuthenticated ? (
          <>
            {location.pathname === "/" ? null : (
              <>
                {(user?.userType === "ngo" ||
                  location.pathname === "/ngoDashboard") && (
                  <button
                    onClick={() => navigate("/ngoDashboard")}
                    className={`px-3 lg:px-6 py-2 lg:py-3 font-medium transition-colors text-sm lg:text-base ${
                      theme === "light"
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Dashboard
                  </button>
                )}

                {(user?.userType === "survivor" ||
                  location.pathname === "/survivorDashboard") && (
                  <button
                    onClick={() => navigate("/survivorDashboard")}
                    className={`px-3 lg:px-6 py-2 lg:py-3 font-medium transition-colors text-sm lg:text-base ${
                      theme === "light"
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Dashboard
                  </button>
                )}

                {(user?.userType === "volunteer" ||
                  location.pathname === "/volunteer") && (
                  <button
                    onClick={() => navigate("/volunteer")}
                    className={`px-3 lg:px-6 py-2 lg:py-3 font-medium transition-colors text-sm lg:text-base ${
                      theme === "light"
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Volunteer
                  </button>
                )}

                {(user?.userType === "Supplier" ||
                  location.pathname === "/supplierDashboard") && (
                  <button
                    onClick={() => navigate("/supplierDashboard")}
                    className={`px-3 lg:px-6 py-2 lg:py-3 font-medium transition-colors text-sm lg:text-base ${
                      theme === "light"
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/");
                  }}
                  className={`px-3 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors shadow-sm text-sm lg:text-base ${
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
                onClick={() => navigate("/signup")}
                className={`px-3 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors shadow-sm text-sm lg:text-base ${
                  theme === "light"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-gray-900 hover:bg-blue-400"
                }`}
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`px-3 lg:px-6 py-2 lg:py-3 font-medium transition-colors text-sm lg:text-base ${
                  theme === "light"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Login
              </button>
            </>
          )
        )}
        {location.pathname !== "/volunteer" && (
          <button
            onClick={() => navigate("/donate")}
            className={`px-3 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors shadow-sm text-sm lg:text-base ${
              theme === "light"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-gray-900 hover:bg-blue-400"
            }`}
          >
            Donate
          </button>
        )}
        <button
          onClick={() => navigate("/about")}
          className={`px-3 lg:px-6 py-2 lg:py-3 font-medium transition-colors text-sm lg:text-base ${
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
            theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 md:hidden shadow-2xl border-t z-50 ${
          theme === "light" ? "bg-white border-gray-200 shadow-black/20" : "bg-gray-900 border-gray-700 shadow-black/60"
        }`}>
          <div className="flex flex-col p-4 space-y-2">
            {/* Home Button for Mobile */}
            {location.pathname !== "/" && (
              <button
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                  theme === "light"
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            )}
            
            {/* Navigation Buttons */}
            {isAuthenticated ? (
              <>
                {location.pathname === "/" ? null : (
                  <>
                    {(user?.userType === "ngo" ||
                      location.pathname === "/ngoDashboard") && (
                      <button
                        onClick={() => {
                          navigate("/ngoDashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                          theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Dashboard
                      </button>
                    )}

                    {(user?.userType === "survivor" ||
                      location.pathname === "/survivorDashboard") && (
                      <button
                        onClick={() => {
                          navigate("/survivorDashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                          theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Dashboard
                      </button>
                    )}

                    {(user?.userType === "volunteer" ||
                      location.pathname === "/volunteer") && (
                      <button
                        onClick={() => {
                          navigate("/volunteer");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                          theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        Volunteer
                      </button>
                    )}

                    {(user?.userType === "Supplier" ||
                      location.pathname === "/supplierDashboard") && (
                      <button
                        onClick={() => {
                          navigate("/supplierDashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                          theme === "light"
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
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors shadow-sm ${
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
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors shadow-sm ${
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
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
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
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors shadow-sm ${
                  theme === "light"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-gray-900 hover:bg-blue-400"
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
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                theme === "light"
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              About
            </button>

            {/* Theme Toggle for Mobile */}
            <button
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
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
