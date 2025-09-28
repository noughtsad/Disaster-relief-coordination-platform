import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.nav
      className={`flex justify-between items-center px-8 py-6 shadow-sm transition-colors relative ${
        theme === "light"
          ? "bg-white/95 text-gray-800 backdrop-blur-sm"
          : "bg-gray-900/95 text-white backdrop-blur-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Animated background blur effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50/10 to-indigo-50/10"
        animate={{
          background: theme === "light" 
            ? ["linear-gradient(90deg, rgba(59,130,246,0.02), rgba(99,102,241,0.02))",
               "linear-gradient(90deg, rgba(99,102,241,0.02), rgba(59,130,246,0.02))"]
            : ["linear-gradient(90deg, rgba(59,130,246,0.05), rgba(99,102,241,0.05))",
               "linear-gradient(90deg, rgba(99,102,241,0.05), rgba(59,130,246,0.05))"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h1 
        className="text-3xl font-bold relative z-10"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Crisis
        </motion.span>
        <motion.span
          className="text-blue-600"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Connect
        </motion.span>
      </motion.h1>

      <motion.div 
        className="flex items-center gap-6 relative z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Navigation Buttons */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/register"
            className={`px-6 py-3 rounded-lg font-medium transition-all shadow-sm relative overflow-hidden group ${
              theme === "light"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-gray-900 hover:bg-blue-400"
            }`}
          >
            <span className="relative z-10">Register</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/login"
            className={`px-6 py-3 font-medium transition-all relative group ${
              theme === "light"
                ? "text-gray-700 hover:text-gray-900"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="relative z-10">Login</span>
            <motion.div
              className={`absolute bottom-0 left-0 h-0.5 ${
                theme === "light" ? "bg-gray-900" : "bg-white"
              }`}
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/about"
            className={`px-6 py-3 font-medium transition-all relative group ${
              theme === "light"
                ? "text-gray-700 hover:text-gray-900"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="relative z-10">About</span>
            <motion.div
              className={`absolute bottom-0 left-0 h-0.5 ${
                theme === "light" ? "bg-gray-900" : "bg-white"
              }`}
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        {/* Theme Toggle Button */}
        <motion.button
          className={`p-2 rounded-full transition-all ${
            theme === "light"
              ? "hover:bg-gray-100"
              : "hover:bg-gray-800"
          }`}
          onClick={toggleTheme}
          whileHover={{ 
            scale: 1.1,
            rotate: 180,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "light" ? 0 : 180 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {theme === "light" ? (
              <Sun size={20} className="text-gray-600" />
            ) : (
              <Moon size={20} className="text-gray-300" />
            )}
          </motion.div>
          <span className="sr-only">Toggle Theme</span>
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;