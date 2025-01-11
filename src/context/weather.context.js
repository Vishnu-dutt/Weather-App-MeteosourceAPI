import React, { createContext, useEffect, useState } from "react";
import { DEFAULT_PLACE, MEASUREMENT_SYSTEMS, UNITS } from "../constansts/index";
import { getWeatherData } from "../apis";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [place, setPlace] = useState(DEFAULT_PLACE);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [measurementSystem, setMeasurementSystem] = useState(
    MEASUREMENT_SYSTEMS.AUTO
  );

  const [units, setUnits] = useState({});

  useEffect(() => {
    async function _getWeatherData() {
      setLoading(true);

      try {
        const cw = await getWeatherData("current", place.place_id, "auto");
        setCurrentWeather(cw.current);
        console.log(UNITS[cw.units]);

        const hf = await getWeatherData("hourly", place.place_id, "auto");
        setHourlyForecast(hf.hourly.data);

        const df = await getWeatherData("daily", place.place_id, "auto");
        setDailyForecast(df.daily.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }

    _getWeatherData();
  }, [place]);

  return (
    <WeatherContext.Provider
      value={{
        place,
        loading,
        currentWeather,
        hourlyForecast,
        dailyForecast,
        measurementSystem,
        setMeasurementSystem,
        units,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherProvider };
export default WeatherContext;
