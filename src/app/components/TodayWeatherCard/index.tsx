import { ReactElement } from "react";

import { WeatherCard } from "../WeatherCard";
import { UvIndicator } from "../UvIndexIndicator";
import { PressureIndicator } from "../PressureIndicator";
import { TodayWeather } from "@/app/lib/api";

type TodayWeatherInfo = {
  name: string;
  icon: ReactElement;
  getDescription: (todayWeather: TodayWeather) => string;
};

type Props = {
  todayWeatherInfo: TodayWeatherInfo;
  isPressure?: boolean;
  isUvIndex?: boolean;
  todayWeather: TodayWeather;
};

export const TodayWeatherCard = ({
  todayWeatherInfo: { name, icon, getDescription },
  isUvIndex,
  isPressure,
  todayWeather,
}: Props) => {
  return (
    <WeatherCard title={name} icon={icon}>
      <div className="flex flex-col justify-between h-full text-white min-h-[120px]">
        {isPressure ? (
          <PressureIndicator pressure={todayWeather.pressure} />
        ) : (
          <div className="h-full flex flex-col justify-between">
            <span className="text-white text-[30px] font-bold">
              {todayWeather[name as keyof TodayWeather]}
            </span>
            {isUvIndex && <UvIndicator uv={todayWeather.uv} />}
            <p className="text-[11px]">{getDescription(todayWeather)}</p>
          </div>
        )}
      </div>
    </WeatherCard>
  );
};
