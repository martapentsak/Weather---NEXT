"use client";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import { HourlyWeather } from "@/app/lib/api";
import { WeatherCard } from "../WeatherCard";

type Props = {
  forecast: HourlyWeather[];
};

export function HourlyWeatherContainer({ forecast }: Props) {
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
          {forecast.map(({ time, icon, temp }, index) => (
            <div className="flex flex-col items-center py-2 pr-5" key={index}>
              <p className="text-white text-[11px] font-bold">{time}</p>
              <div className="h-[60px] flex items-center justify-center">
                <img src={icon} className="w-[45px] h-auto" />
              </div>
              <span className="text-white font-bold text-[13px]">{temp}</span>
            </div>
          ))}
        </div>
      </WeatherCard>
    </main>
  );
}
