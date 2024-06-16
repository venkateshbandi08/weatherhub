import React, { useContext } from "react";
import "./index.css";
import weatherLogo from "../../assets/weatherLogo.png";
import { MdDarkMode } from "react-icons/md";

import { ThemeContext } from "../../App";

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="nav-container">
      <div>
        <img src={weatherLogo} className="logo-style" alt="Weather logo" />
      </div>
      <div>
        <h1 className="brand-name">Weather Hub</h1>
      </div>
      <div>
        <MdDarkMode
          className="mode-toggle-icon"
          onClick={toggleTheme}
          title="Toggle Dark Mode"
        />
      </div>
    </nav>
  );
};

export default Header;
