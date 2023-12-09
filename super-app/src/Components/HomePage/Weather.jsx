import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PressureIcon from '../../Assets/PressureIcon.png';
import WindIcon from '../../Assets/WindIcon.png';
import HumidityIcon from '../../Assets/HumidityIcon.png';
import LineIcon from '../../Assets/LineIcon.png';
import Weather from '../../Assets/Weather.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Weather = () => {
  const [newDate, setNewDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(() => {
      setNewDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  let AmPm = newDate.getHours() >= 12 ? 'PM' : 'AM';
  let hours = newDate.getHours() % 12 || 12;
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = newDate.getMinutes < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();


  const url = 'https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=168a4cb69d793f3cba844cbac36357e6';
  const fetchWeatherData = async () => {
    try {
      await axios.get(url).then(
        (response) => {
          console.log(response.data)
          setWeatherData({
            condition: response.data.weather[0].main,
            conditionIcon: response.data.weather[0].icon,
            temparature: response.data.main.temp,
            pressure: response.data.main.pressure,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity
          })
        }
      )
    } catch (e) {
      console.error('Error in Weather fetching :', e);
      toast.error("Error in Weather Fetching!");
    }
  };


  return (
    <div className='weather-box'>
      <ToastContainer />
      <div className="date-time">
        <div className="date">
          {`${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`}
        </div>
        <div className="time">
          {`${hours}:${minutes} ${AmPm}`}
        </div>
      </div>
      <div className="weather">
        <div className='todays-weather' id="weather-condition">
          <img className="weather-icon" src={Weather || weatherData.conditionIcon} alt='W-Icon'></img>
          <div className="weather-condition">{weatherData.condition}</div>
        </div>
        <img id='line-icon' src={LineIcon} alt="Line-Icon" />
        <div className='todays-weather' id="temp-pressure">
          <div id='temparature'>{Math.round(weatherData.temparature - 273.15)}°C</div>
          <div className="pressure">
            <img id='pressure-icon' src={PressureIcon} alt="pressure-icon" />
            <div id="pressure-value">{weatherData.pressure} mbar Pressure</div>
          </div>
        </div>
        <img id='line-icon' src={LineIcon} alt="Line-Icon" />
        <div className='todays-weather' id="wind-humidity">
          <div className="wind">
            <img id='wind-icon' src={WindIcon} alt="Wind-Icon" />
            <div id='wind-text'>{weatherData.wind} km/h Wind</div>
          </div>
          <div className="humidity">
            <img id='humidity-icon' src={HumidityIcon} alt="humidity-Icon" />
            <div id='humidity-text'>{weatherData.humidity}% Humidity</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;