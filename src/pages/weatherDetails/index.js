import React, { useState, useEffect } from "react";
import "./index.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { baseUrl, apiKey } from "../../apiRoutes";
import { IoMdSearch } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { WiCloudyWindy } from "react-icons/wi";
import { BsFillSunriseFill } from "react-icons/bs";
import { BsFillSunsetFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";

const WeatherDetails = () => {
  const favoriteCities = ["Hyderabad", "Mumbai", "Bengaluru", "Delhi"];
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [inputCity, setInputCity] = useState("Hyderabad");
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };
  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    return dayOfWeek;
  };
  const getTodaysWeather = async (currentCity) => {
    try {
      const url = `${baseUrl}/weather?q=${currentCity}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setCurrentWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        currentDate: convertTimestampToDate(data.dt),
        currentTime: convertTimestampToTime(data.dt),
        timezone: data.timezone,
        highTemp: Math.floor(data.main.temp_max),
        lowTemp: Math.floor(data.main.temp_min),
        country: data.sys.country,
        sunrise: convertTimestampToTime(data.sys.sunrise),
        sunset: convertTimestampToTime(data.sys.sunset),
        currentDay: getDayOfWeek(data.dt),
        mainWeatherDescription: data.weather[0].description,
        cityName: data.name,
        countryName: data.sys.country,
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Enter a valid city name");
    }
  };
  useEffect(() => {
    getTodaysWeather("hyderabad");
  }, []);
  const onSearchWeatherOfACity = () => {
    if (inputCity) {
      getTodaysWeather(inputCity);
      setInputCity("");
    } else {
      alert("Enter a Valid city name");
    }
  };
  const onClickFavCityIcon = (cityname) => {
    getTodaysWeather(cityname);
    setInputCity("");
  };
  return (
    <div className="weather-details-container">
      <div className="weather-container">
        <div className="fav-cities-container">
          {favoriteCities.map((eachCity) => (
            <p
              className="fav-city-name"
              onClick={() => onClickFavCityIcon(eachCity)}
            >
              {eachCity}
            </p>
          ))}
        </div>
        <div className="city-input-container">
          <input
            className="input-container"
            placeholder="Enter City Name..."
            onChange={(e) => setInputCity(e.target.value)}
            value={inputCity}
          />
          <div className="search-and-location-icons-container">
            <IoMdSearch
              className="input-icon"
              onClick={onSearchWeatherOfACity}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <p> Loading... </p>
          </div>
        ) : (
          <>
            <div className="current-date-and-time-container">
              <div className="date-container">
                <p className="date-time">
                  {currentWeatherData.currentDay},{" "}
                  {currentWeatherData.currentDate}{" "}
                </p>
              </div>
              <h2> | </h2>
              <div className="time-container">
                <p className="date-time">
                  Local time : {currentWeatherData.currentTime}
                </p>
              </div>
            </div>
            <div className="city-container">
              <h2>
                {currentWeatherData.cityName}, {currentWeatherData.countryName}{" "}
              </h2>
            </div>
            <div className="current-weather-container">
              <img
                src={currentWeatherData.weatherIcon}
                className="weather-icon"
              />
              <p className="weather-description">
                {currentWeatherData.mainWeatherDescription}
              </p>
            </div>
            <div className="weather-report-container">
              <div className="current-temperature-container">
                <IoIosSunny className="sunny-icon" />
                <h2 className="weather-celcius">
                  {currentWeatherData.temperature} C
                </h2>
              </div>
              <div className="humidity-wind-container">
                <div className="humidity-container">
                  <WiHumidity className="sunny-icon" />
                  <h3 className="humidity-num">
                    {" "}
                    Humidity {currentWeatherData.humidity}{" "}
                  </h3>
                </div>
                <div className="humidity-container">
                  <WiCloudyWindy className="sunny-icon" />
                  <h3 className="humidity-num">
                    {" "}
                    Wind {currentWeatherData.windSpeed}{" "}
                  </h3>
                </div>
              </div>
            </div>
            <div className="sun-and-temps-container">
              <div className="sun-container">
                <div className="sun-item-container">
                  <BsFillSunriseFill className="sun-icon" />
                  <p className="sun-name">
                    {" "}
                    Sunrise {currentWeatherData.sunrise}{" "}
                  </p>
                </div>
                <div className="sun-item-container">
                  <BsFillSunsetFill className="sun-icon" />
                  <p className="sun-name">
                    {" "}
                    Sunset {currentWeatherData.sunset}{" "}
                  </p>
                </div>
              </div>
              <h2> | </h2>
              <div className="time-container">
                <div className="time-item-container">
                  <MdOutlineWbSunny className="sun-icon" />
                  <p className="time-name">
                    High {currentWeatherData.highTemp}{" "}
                  </p>
                </div>
                <div className="time-item-container">
                  <MdOutlineWbSunny className="sun-icon" />
                  <p className="time-name">
                    {" "}
                    Low {currentWeatherData.lowTemp}{" "}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;
