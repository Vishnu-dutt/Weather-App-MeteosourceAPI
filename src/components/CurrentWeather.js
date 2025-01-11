import React, { useContext } from "react";
import "../styles/components/CurrentWeather.scss";
import WeatherIcons from "./WeatherIcons";
import WeatherContext from "../context/weather.context";
import { UNITS } from "../constansts";

function CurrentWeather({ data }) {
  const {
    cloud_cover,
    feels_like,
    humidity,
    icon_num,
    precipitation,
    summary,
    uv_index,
    temperature,
    visibility,
    wind,
  } = data;

  const { units } = useContext(WeatherContext);

  const otherInfoWidgets = [
    {
      id: 0,
      icon: "droplet",
      name: "Precipitation",
      value: Math.round(precipitation.total),
      unit: units.precipitation,
    },
    {
      id: 1,
      icon: "wind",
      name: "wind",
      value: Math.round(wind.speed),
      unit: units.wind_speed,
    },
    {
      id: 2,
      icon: "moisture",
      name: "Humidity",
      value: Math.round(humidity),
      unit: units.humidity,
    },
    {
      id: 3,
      icon: "sunglasses",
      name: "UV index",
      value: Math.round(uv_index),
      unit: units.uv_index,
    },
    {
      id: 4,
      icon: "cloud-fill",
      name: "Cloud cover",
      value: Math.round(cloud_cover),
      unit: units.cloud_cover,
    },
    {
      id: 5,
      icon: "eye",
      name: "Visibility",
      value: Math.round(visibility),
      unit: units.visibility,
    },
  ];

  return (
    <div className="CurrentWeather">
      <div className="temperature">
        <div className="weather-icon">
          <WeatherIcons iconNumber={icon_num} summary={summary} />
        </div>
        <div className="value">
          <div className="real">
            {temperature} {units.temperature}
          </div>
          <div className="feels_like">
            feels like{feels_like} {units.temperature}
          </div>
        </div>
        <div className="summary">{summary}</div>
      </div>
      <div className="other-infos">
        {otherInfoWidgets.map(({ id, icon, name, value, unit }) => (
          <div className="widget" key={id}>
            <div className="widget-container">
              <div className="info">
                <div className="icon">
                  <i className={`bi bi-${icon}`}></i>
                </div>
                <div className="value">
                  {value} {unit}
                </div>
              </div>
              <div className="name">{name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentWeather;
