import React from 'react'

const Weather = () => {
  const newDate = new Date();
  console.log(newDate);

  let AmPm = newDate.getHours() >= 12 ? 'PM' : 'AM';
  let hours = newDate.getHours() % 12 || 12;
  hours = hours < 10 ? '0'+hours : hours;
  let minutes = newDate.getMinutes < 10 ? '0'+newDate.getMinutes() : newDate.getMinutes();
  console.log(hours, minutes, AmPm);
  return (
    <div className='weather-box'>
      <div className="date-time">
        <div className="date">
          {`${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`}
        </div>
        <div className="time">
          {`${hours}:${minutes} ${AmPm}`}
        </div>
      </div>
      <div className="weather"></div>
    </div>
  )
}

export default Weather;