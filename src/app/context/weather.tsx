"use client";

import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Location } from "../types";

type HourlyWeatherResponse = {
  temp_c: number;
  time: string;
  condition: {
    icon: string;
  };
};

type HourlyWeather = Pick<HourlyWeatherResponse, "time"> & {
  temp: string;
  icon: string;
};

type ProviderValues = {
  hourlyWeather: HourlyWeather[];
  getHourlyWeather: (location: Location) => void;
};

type Props = {
  children: ReactNode;
};

export const WeatherContext = createContext({} as ProviderValues);

export const WeatherProvider = ({ children }: Props) => {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchHourlyWeather(location: Location) {
    setLoading(true);
    try {
      const response = await axios.get(hourlyWeatherUrl(location));
      return {
        forecast: response.data.forecast.forecastday,
        localTime: response.data.location.localtime,
      };
    } finally {
      setLoading(false);
    }
  }

  async function getHourlyWeather(location: Location) {
    const { forecast, localTime } = await fetchHourlyWeather(location);
    const currentTimeHours = localTime.slice(11, 13); //get only hours
    const todayHourlyWeather = forecast[0].hour.slice(currentTimeHours);
    const tommorowHourlyWeather = forecast[1].hour.slice(
      0,
      25 - todayHourlyWeather.length
    );
    // The hourlyWeather array is created by combining today's remaining hours and the first hours of tomorrow, ensuring it always contains 24
    //   consecutive hours of forecast data starting from the current hour.
    const hourlyWeather = todayHourlyWeather
      .concat(tommorowHourlyWeather)
      .map(
        ({ temp_c, time, condition }: HourlyWeatherResponse, index: number) => {
          const day = time.slice(0, 10);
          const hours = time.slice(11, 13);
          return {
            temp: Math.round(temp_c),
            time: index === 0 ? "Now" : hours,
            icon: `https:${condition.icon}`,
          };
        }
      );

    setHourlyWeather(hourlyWeather);
  }

  const providerValues: ProviderValues = {
    hourlyWeather,
    getHourlyWeather,
  };

  return (
    <WeatherContext.Provider value={providerValues}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const weathernContext = useContext(WeatherContext);

  if (!weathernContext) {
    throw Error("Weather context is not found");
  }
  return weathernContext;
};

const hourlyWeatherUrl = (location: Location) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&days=2&aqi=no&alerts=no`;
