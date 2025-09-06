import React, { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "light" ? "bg-white text-gray-900 min-h-screen" : "bg-gray-900 text-gray-100 min-h-screen"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
export { ThemeContext };
export default ThemeProvider;