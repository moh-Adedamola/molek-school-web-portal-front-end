// src/context/ThemeContext.jsx

import React, { createContext, useContext, useState } from "react";

// Create the context
const ThemeContext = createContext();

// Provider (wraps children)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // default theme

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook (for consuming components)
export const useTheme = () => useContext(ThemeContext);
