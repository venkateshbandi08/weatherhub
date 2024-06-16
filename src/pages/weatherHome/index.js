// WeatherHome.js
import React from "react";
import "./index.css";
import Header from "../header";
import WeatherDetails from "../weatherDetails";

const WeatherHome = () => {
  return (
    <div className="background-container">
      <Header />
      <WeatherDetails />
    </div>
  );
};

export default WeatherHome;
