"use client";
import { HourlyWeatherContainer } from "./components/HourlyWeather";
import { LocationSelector } from "./components/LocationSelector";
import { WeeklyWeatherContainer } from "./components/WeeklyWeather";
import { useWeather } from "./context/weather";
import { TodayWeatherCard } from "./components/TodayWeatherCard";
import {
  UvIndex,
  identifyVideoWeather,
  otherWeatheIndicator,
} from "@/constants/weatherIndicator";

export default function Home() {
  const {
    todayWeather: { city, condition, temp },
  } = useWeather();

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={identifyVideoWeather(condition)}
      />
      <main className="w-[70%] h-[95%] flex flex-col items-center  p-[10px] absolute">
        <div className="w-full flex items-center justify-end ">
          <LocationSelector />
        </div>
        <div className="w-full flex flex-col items-center justify-center pb-[10px] text-white">
          <h2 className="text-[20px]">{city}</h2>
          <span className="text-[45px] font-bold">{temp}°С</span>
          <span>{condition}</span>
        </div>
        <div className="w-full">
          <HourlyWeatherContainer />
          <div className="w-full flex items-start mt-[10px] justify-between">
            <div className="flex flex-col align-between">
              <WeeklyWeatherContainer />
              <div className="mt-[10px]">
                <TodayWeatherCard todayWeatherInfo={UvIndex} isUvIndex />
              </div>
            </div>
            <div className="w-[73%] grid grid-cols-3 gap-[10px]">
              {otherWeatheIndicator.map((todayWeatherInfo, index) => (
                <TodayWeatherCard
                  key={index}
                  todayWeatherInfo={todayWeatherInfo}
                  isPressure={todayWeatherInfo.name === "pressure"}
                  isUvIndex={todayWeatherInfo.name === "uv"}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
