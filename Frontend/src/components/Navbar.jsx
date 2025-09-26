import { useContext } from "react";
import { Plus, Minus, Search, ZoomIn, ZoomOut, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800">CrisisConnect</h1>
      
      <div className="flex items-center gap-6">
        
        {/* Navigation Buttons */}
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Register
        </button>
        <button className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Login
        </button>
        <button className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors">
          About
        </button>
        {/* Theme toggle Button */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun size={20} className="text-gray-600" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;