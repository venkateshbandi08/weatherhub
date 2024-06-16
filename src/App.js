// App.js
import React, { useState, createContext } from "react";
import "./App.css";
import WeatherHome from "./pages/weatherHome";

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? "App-dark" : "App-light"}>
        <WeatherHome />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
