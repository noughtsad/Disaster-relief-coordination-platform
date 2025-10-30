import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`mt-auto border-t ${
      theme === 'light' 
        ? 'bg-white/80 border-gray-200 text-gray-600' 
        : 'bg-gray-900/80 border-gray-700 text-gray-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs sm:text-sm">
            © 2025 CrisisConnect. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm">
            Emergency Hotline: <span className="font-semibold">1-800-HELP-NOW</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
