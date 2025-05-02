"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherCard } from "../WeatherCard";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Location } from "@/app/types";

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

type Props = {
  location: Location;
};

export const nowHours = new Date().getHours(); //Just number => 12
const formattedDate = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

export const HourlyWeatherContainer = ({
  location: { latitude, longitude },
}: Props) => {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);

  useEffect(() => {
    getHourlyWeather();
  }, []);

  async function getHourlyWeather() {
    if (latitude) {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=49831810639d416d94085601252904&q=${latitude},${longitude}&days=2&aqi=no&alerts=no`;
      const response = await axios
        .get(url)
        .then((response) => response.data.forecast.forecastday);
      const todayHourlyWeather = response[0].hour.slice(nowHours);
      const tommorowHourlyWeather = response[1].hour.slice(
        0,
        25 - todayHourlyWeather.length
      );
      // The hourlyWeather array is created by combining today's remaining hours and the first hours of tomorrow, ensuring it always contains 24
      //   consecutive hours of forecast data starting from the current hour.
      const hourlyWeather = todayHourlyWeather
        .concat(tommorowHourlyWeather)
        .map(({ temp_c, time, condition }: HourlyWeatherResponse) => {
          const day = time.slice(0, 10);
          const hours = time.slice(11, 13);
          return {
            temp: Math.round(temp_c),
            time:
              formattedDate == day && hours.includes(nowHours.toString())
                ? "Now"
                : time.slice(11),
            icon: `https:${condition.icon}`,
          };
        });

      setHourlyWeather(hourlyWeather);
    }
  }
  return (
    <main className="w-full flex overflow-x-auto scrollbar-hidden">
      <WeatherCard title="Hourly" icon={<QueryBuilderIcon fontSize="small" />}>
        <div
          className="flex items-center overflow-x-scroll scrollbar-hidden"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          {hourlyWeather.map(({ time, icon, temp }, index) => (
            <div className="flex flex-col items-center py-2 pr-5" key={index}>
              <p className="text-white text-[11px] font-bold">{time}</p>
              <div className="h-[60px] flex items-center justify-center">
                <img src={icon} className="w-[35px] h-auto" />
              </div>
              <span className="text-white font-bold text-[13px]">{temp}</span>
            </div>
          ))}
        </div>
      </WeatherCard>
    </main>
  );
};
