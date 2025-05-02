"use client";
import { HourlyWeatherContainer } from "../components/HourlyWeatherContainer";
import { LocationSelector } from "../components/LocationSelector";
import { useLocation } from "../context/location";

export const HomePage = () => {
  const {location} = useLocation()

  if (!location) return <p>Loading</p>

 
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <main className="w-[60%] h-[90%] flex flex-col items-center  p-[10px]">
        <div className="w-full flex items-center justify-end">
          <LocationSelector />
        </div>
        <HourlyWeatherContainer location={location}/>

      </main>
    </div>
  );
};
