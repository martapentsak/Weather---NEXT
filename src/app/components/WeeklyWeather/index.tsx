"use client";

import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { WeatherCard } from "../WeatherCard";
import { WeeklyWeather } from "@/app/lib/api";

type Props = {
  forecast: WeeklyWeather[];
};

export function WeeklyWeatherContainer({ forecast }: Props) {
  return (
    <div className="flex overflow-x-auto scrollbar-hidden">
      <WeatherCard title="10-day forecast" icon={<CalendarMonthIcon />}>
        {forecast.map(({ day, icon, minTemp, maxTemp }, index) => (
          <div className="flex items-center pr-5" key={index}>
            <p className="text-white text-[11px] font-bold w-[75px]">{day}</p>
            <div className="h-[40px] flex items-center justify-center pr-[20px]">
              <img
                src={icon}
                className="w-[35px] h-auto"
                alt={`Icon for ${day}`}
              />
            </div>
            <div className="w-[140px] flex items-center justify-between">
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
}
