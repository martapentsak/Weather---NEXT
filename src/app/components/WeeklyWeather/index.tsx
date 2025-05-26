"use client";
import { WeatherCard } from "../WeatherCard";
import { useWeather } from "@/app/context/weather";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

export const WeeklyWeatherContainer = () => {
  const { weeklyWeather } = useWeather();

  return (
    <div className="w-full flex overflow-x-auto scrollbar-hidden mt-[15px]">
      <WeatherCard title="10-day forecast" icon={<CalendarMonthIcon />}>
        {weeklyWeather.map(({ day, icon, minTemp, maxTemp }, index) => (
          <div className="flex  items-center py-2 pr-5" key={index}>
            <p className="text-white text-[11px] font-bold w-[75px]">{day}</p>
            <div className="h-[40px] flex items-center justify-center pr-[15px]">
              <img src={icon} className="w-[35px] h-auto" />
            </div>
            <div className=" w-[90px] flex items-center justify-between ">
              <span className="text-[#99a7b5] font-bold text-[13px]">
                {minTemp}°
              </span>
              <span className="text-white">
                <TrendingFlatIcon />
              </span>
              <span className="text-white font-bold text-[13px]">
                {maxTemp}°
              </span>
            </div>
          </div>
        ))}
      </WeatherCard>
    </div>
  );
};