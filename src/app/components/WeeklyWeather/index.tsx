"use client";

import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { WeatherCard } from "../WeatherCard";
import { useWeather } from "@/app/context/weather";

export const WeeklyWeatherContainer = () => {
  const { weeklyWeather } = useWeather();

  return (
    <div className="flex overflow-x-auto scrollbar-hidden">
      <WeatherCard title="10-day forecast" icon={<CalendarMonthIcon />}>
        {weeklyWeather.map(({ day, icon, minTemp, maxTemp }, index) => (
          <div className="flex  items-center  pr-5" key={index}>
            <p className="text-white text-[11px] font-bold w-[75px]">{day}</p>
            <div className="h-[40px] flex items-center justify-center pr-[20px]">
              <img src={icon} className="w-[35px] h-auto" />
            </div>
            <div className=" w-[140px] flex items-center justify-between ">
              <span className="text-[#99a7b5] font-bold text-[14px]">
                {minTemp}°
              </span>
              <span className="text-white">
                <TrendingFlatIcon />
              </span>
              <span className="text-white font-bold text-[14px]">
                {maxTemp}°
              </span>
            </div>
          </div>
        ))}
      </WeatherCard>
    </div>
  );
};
