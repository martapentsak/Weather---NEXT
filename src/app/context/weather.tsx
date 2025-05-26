"use client";

import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { Location } from "../types";

type HourlyWeatherResponse = {
  temp_c: number;
  time: string;
  condition: {
    icon: string;
  };
};
type WeeklyWeatherResponse = {
  date: string;
  date_epoch: number;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: { icon: string };
  };
};

export type TodayWeather = {
  temp: number;
  wind: number;
  pressure: number;
  humidity: number;
  feelsLike: number;
  uv: number;
  visibility: number;
  condition: string;
  city: string;
  precipitation: number;
};

type HourlyWeather = Pick<HourlyWeatherResponse, "time"> & {
  temp: string;
  icon: string;
};

type WeeklyWeather = {
  minTemp: number;
  maxTemp: number;
  day: string;
  icon: string;
};

type ProviderValues = {
  hourlyWeather: HourlyWeather[];
  weeklyWeather: WeeklyWeather[];
  fetchWeather: (location: Location) => void;
};

type Props = {
  children: ReactNode;
};

export const WeatherContext = createContext({} as ProviderValues);

export const WeatherProvider = ({ children }: Props) => {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [weeklyWeather, setWeeklyWeather] = useState<WeeklyWeather[]>([]);

  async function getWeeklyWeather(location: Location) {
    const {
      forecast: { forecastday },
    } = await fetchForecast(location, 10);
    const weather = mapWeeklyForecast(forecastday);
    setWeeklyWeather(weather);
  }

  async function getHourlyWeather(location: Location) {
    const {
      forecast: { forecastday },
      location: loc,
    } = await fetchForecast(location, 2);
    const nowHours = loc.localtime.slice(11, 13); //16:15
    const [today, tomorrow] = forecastday;
    const todayHourlyWeather = today.hour.slice(nowHours);
    const tommorowHourlyWeather = tomorrow.hour.slice(
      0,
      25 - todayHourlyWeather.length
    );
    // The hourlyWeather array is created by combining today's remaining hours and the first hours of tomorrow, ensuring it always contains 24
    //   consecutive hours of forecast data starting from the current hour.
    const hourlyWeather = todayHourlyWeather
      .concat(tommorowHourlyWeather)
      .map(
        ({ temp_c, time, condition }: HourlyWeatherResponse, index: number) => {
          return {
            temp: Math.round(temp_c),
            time: index === 0 ? "Now" : time.slice(11, 13),
            icon: `https:${condition.icon}`,
          };
        }
      );

    setHourlyWeather(hourlyWeather);   
  }

  async function fetchWeather(location: Location) {
    await Promise.all([getHourlyWeather(location), getWeeklyWeather(location)]);
  }

  const providerValues: ProviderValues = {
    hourlyWeather,
    weeklyWeather,
    fetchWeather,
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

const fetchForecast = async (location: Location, days: number) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&days=${days}&aqi=no&alerts=no`
  );
  return response.data;
};

const mapWeeklyForecast = (forecast: WeeklyWeatherResponse[]) => {
  return forecast.map(
    (
      {
        date_epoch,
        day: {
          mintemp_c,
          maxtemp_c,
          condition: { icon },
        },
      }: WeeklyWeatherResponse,
      index: number
    ) => {
      const day = new Date(date_epoch * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      }); //from 1746144000 to day like sunday
      return {
        minTemp: Math.round(mintemp_c),
        maxTemp: Math.round(maxtemp_c),
        icon: `http:${icon}`,
        day: index === 0 ? "Today" : day,
      };
    }
  );
};