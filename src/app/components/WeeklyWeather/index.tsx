"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherCard } from "../WeatherCard";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Location } from "@/app/types";
import { useWeather } from "@/app/context/weather";

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



export const WeeklyWeatherContainer = () => {
    const {weeklyWeather} = useWeather()

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
          {/* {hourlyWeather.map(({ time, icon, temp }, index) => (
            <div className="flex flex-col items-center py-2 pr-5" key={index}>
              <p className="text-white text-[11px] font-bold">{time}</p>
              <div className="h-[60px] flex items-center justify-center">
                <img src={icon} className="w-[45px] h-auto" />
              </div>
              <span className="text-white font-bold text-[13px]">{temp}</span>
            </div>
          ))} */}
        </div>
      </WeatherCard>
    </main>
  );
};
