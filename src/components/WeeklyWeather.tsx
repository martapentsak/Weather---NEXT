"use client";

import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { WeatherCard } from "./WeatherCard";
import { WeeklyWeather } from "@/lib/api";
import Image from "next/image";

type Props = {
  forecast: WeeklyWeather[];
};

export function WeeklyWeather({ forecast }: Props) {
  return (
    <div className="flex overflow-x-auto scrollbar-hidden w-full max-h-[200px]">
      <WeatherCard title="10-day forecast" icon={<CalendarMonthIcon />}>
        {forecast.map(({ day, icon, minTemp, maxTemp }, index) => (
          <div
            className="flex items-center justify-between pr-5 w-full"
            key={index}
          >
            <p className="text-white text-[11px] font-bold w-[30%]">{day}</p>
            <div className="h-[40px] flex items-center justify-center pr-[20px] w-[35px] relative">
              <Image
                src={icon}
                fill
                alt={`Icon for ${day}`}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="w-[35%] flex items-center justify-between">
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
