import { TodayWeather, useWeather } from "@/app/context/weather";
import { WeatherCard } from "../WeatherCard";
import { ReactElement } from "react";
import { UvIndicator } from "../UVIndexIndicator";
import { PressureIndicator } from "../PressureIndicator";

type TodayWeatherInfo = {
  name: string;
  icon: ReactElement;
  getDescription: (todayWeather: TodayWeather) => string;
};

type Props = {
  todayWeatherInfo: TodayWeatherInfo;
  isPressure?: boolean;
  isUvIndex?: boolean;
};

export const TodayWeatherCard = ({
  todayWeatherInfo: { name, icon, getDescription },
  isUvIndex,
  isPressure,
}: Props) => {
  const { todayWeather } = useWeather();
  const { uv, pressure } = todayWeather;

  return (
    <WeatherCard title={name} icon={icon}>
      <div className="flex flex-col justify-between h-full text-white min-h-[120px]">
        {isPressure ? (
          <PressureIndicator pressure={pressure} />
        ) : (
          <div className="h-full flex flex-col justify-between">
            <span className="text-white text-[30px] font-bold">
              {todayWeather[name as keyof TodayWeather]}
            </span>
            {isUvIndex && <UvIndicator uv={uv} />}
            <p className="text-[11px]">{getDescription(todayWeather)}</p>
          </div>
        )}
      </div>
    </WeatherCard>
  );
};
