"use client";

import { HourlyWeather } from "@/lib/api";
import { WeatherCard } from "./WeatherCard";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Image from "next/image";

type Props = {
  forecast: HourlyWeather[];
};

export function HourlyWeather({ forecast }: Props) {
  return (
    <main className="w-full flex overflow-x-auto scrollbar-hidden">
      <WeatherCard title="Hourly" icon={<QueryBuilderIcon fontSize="small" />}>
        <div
          className="flex items-center overflow-x-scroll scrollbar-hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {forecast.map(({ time, icon, temp, condition }, index) => (
            <div className="flex flex-col items-center py-2 pr-5" key={index}>
              <p className="text-white text-[11px] font-bold">{time}</p>
              <div className="h-[70px] flex items-center justify-center w-[40px] relative">
                <Image
                  src={icon}
                  alt={`${condition} at ${time}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-white font-bold text-[13px]">{temp}</span>
            </div>
          ))}
        </div>
      </WeatherCard>
    </main>
  );
}
