import "../styles/components/Main.scss";
import React, { useContext } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import WeatherContext from "../context/weather.context";
import Loader from "./Loader";

function Main() {
  const { loading, currentWeather, hourlyForecast, dailyForecast } =
    useContext(WeatherContext);
  return (
    <div className="Main">
      {loading ? (
        <Loader />
      ) : (
        <>
          <CurrentWeather data={currentWeather} />
          <Forecast
            type="hourly"
            title="HOURLY FORECAST"
            data={hourlyForecast}
          />
          <Forecast type="dail" title="21 DAYS FORECAST" data={dailyForecast} />
        </>
      )}
    </div>
  );
}

export default Main;
