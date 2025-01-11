import React from "react";
import WeatherIcons from "./WeatherIcons";

function DailyForecastWidget({ data }) {
  const {
    day,
    icon,
    temperature_max,
    temperature_min,
    precipitation,
    summary,
  } = data;

  //   data format
  const now_date = {
    day: new Intl.DateTimeFormat(navigator.language, {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).format(new Date()),
  };

  const weather_date = {
    day: new Intl.DateTimeFormat(navigator.language, {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).format(new Date(day)),
  };

  // Condition for showing Today on the current day
  weather_date.day =
    now_date.day === weather_date.day ? "Today" : weather_date.day;

  // console.log(data);
  return (
    <div className="widget">
      <div className="day">{weather_date.day}</div>
      <div className="icon-temp">
        <div className="icon">
          <WeatherIcons iconNumber={icon} summary={summary} />
        </div>
        <div className="max">{Math.round(temperature_max)} °C</div>
        <div className="min">{Math.round(temperature_min)} °C</div>
      </div>
      <div className="precipitation">
        {Math.round(precipitation.total)} mm/h
      </div>
    </div>
  );
}

export default DailyForecastWidget;
