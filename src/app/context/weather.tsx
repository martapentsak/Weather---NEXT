"use client";

import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
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
type WeeklyWeatherResponse = {
    date: string,
    date_epoch: number,
    day: {
            mintemp_c: number,
            maxtemp_c: number,
            condition: { icon: string },
          },
}

type HourlyWeather = Pick<HourlyWeatherResponse, "time"> & {
  temp: string;
  icon: string;
};

type WeeklyWeather =  Pick<WeeklyWeatherResponse, "day"> & {
    minTemp: number;
    maxTemp: number;
    icon: string
  };
  




type ProviderValues = {
  hourlyWeather: HourlyWeather[];
  weeklyWeather: WeeklyWeather[],
  getHourlyWeather: (location: Location) => void;
  getWeeklyWeather:  (location: Location) => void;
};

type Props = {
  children: ReactNode;
};

export const WeatherContext = createContext({} as ProviderValues);

export const WeatherProvider = ({ children }: Props) => {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [weeklyWeather, setWeeklyWeather] = useState<WeeklyWeather[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  async function fetchHourlyWeather(location: Location) {
    setLoading(true);
    try {
      const response = await axios.get(getWeatherUrl(location, 2));
      return {
        forecast: response.data.forecast.forecastday,
        localTime: response.data.location.localtime,
      };
    } finally {
      setLoading(false);
    }
  }


  async function getWeeklyWeather(location: Location) {
      const response = await axios.get(getWeatherUrl(location, 10))
      const weather = response.data.forecast.forecastday.map(
        ({
          date,
          date_epoch,
          day: {
            mintemp_c,
            maxtemp_c,
            condition: { icon },
          },
        }: WeeklyWeatherResponse, index: number) => {
          const day = new Date(date_epoch * 1000).toLocaleDateString("en-US", { weekday: "long" }); //from 1746144000 to day like sunda
          console.log()

          return {
            minTemp: Math.round(mintemp_c),
            maxTemp: Math.round(maxtemp_c),
            icon: `http:${icon}`,
            day: index === 0 ? "Today" : day
          };
        }
      );
      console.log(weather)
      setWeeklyWeather(weather)
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
    weeklyWeather,
    getHourlyWeather,
    getWeeklyWeather
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

const getWeatherUrl = (location: Location, days: number) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&days=${days}&aqi=no&alerts=no`;



