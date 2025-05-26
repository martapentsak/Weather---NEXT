"use client";
import { HourlyWeatherContainer } from "./components/HourlyWeather";
import { LocationSelector } from "./components/LocationSelector";
import { WeeklyWeatherContainer } from "./components/WeeklyWeather";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <main className="w-[70%] h-[95%] flex flex-col items-center  p-[10px] absolute">
        <div className="w-full flex items-center justify-end ">
          <LocationSelector />
        </div>
        <div className="w-full">
          <HourlyWeatherContainer />
          <div className="w-full flex items-start mt-[10px] justify-between">
            <div className="flex flex-col align-between">
              <WeeklyWeatherContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
