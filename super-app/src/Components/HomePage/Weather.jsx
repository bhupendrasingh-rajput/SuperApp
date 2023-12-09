import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PressureIcon from '../../Assets/PressureIcon.png';
import WindIcon from '../../Assets/WindIcon.png';
import HumidityIcon from '../../Assets/HumidityIcon.png';
import LineIcon from '../../Assets/LineIcon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Weather = () => {
  const [newDate, setNewDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(() => {
      setNewDate((prevDate) => {
        const newDateCopy = new Date(prevDate);
        newDateCopy.setSeconds(newDateCopy.getSeconds() + 1);
        return newDateCopy;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  let AmPm = newDate.getHours() >= 12 ? 'PM' : 'AM';
  let hours = newDate.getHours() % 12 || 12;
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = newDate.getMinutes < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();


  // const url = 'http://api.weatherapi.com/v1/current.json?key=862850afe1094ce982c135211232911&q=India&aqi=no';
  // const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/india?unitGroup=metric&key=6ND3FTVJ7S96ZXPUDZ9CR2BQJ&contentType=json';
  const url = 'http://api.weatherstack.com/current?access_key=aafc61883fa05c025d0f08a28deab8dc&query=India';
  const fetchWeatherData = async () => {
    try {
      await axios.get(url).then(
        (response) => {
          console.log(response.data)
          if (response.data && response.data.location) {
            setWeatherData({
              condition: response.data.current.weather_descriptions[0],
              conditionIcon: response.data.current.weather_icons[0],
              temparature: response.data.current.temperature,
              pressure: response.data.current.pressure,
              wind: response.data.current.wind_speed,
              humidity: response.data.current.humidity
            })
            setNewDate(new Date(response.data.location.localtime))
          }
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
          <img className="weather-icon" src={weatherData.conditionIcon} alt='W-Icon'></img>
          <div className="weather-condition">{weatherData.condition}</div>
        </div>
        <img id='line-icon' src={LineIcon} alt="Line-Icon" />
        <div className='todays-weather' id="temp-pressure">
          <div id='temparature'>{weatherData.temparature}°C</div>
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