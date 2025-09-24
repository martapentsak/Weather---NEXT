import { ReactElement } from "react";

import { TodayWeather } from "@/lib/api";
import { WeatherCard } from "./WeatherCard";

type Props = {
  title: string;
  indicator: string;
  icon: ReactElement;
  getDescription?: (value: number) => string;
  todayWeather: TodayWeather;
  measurement?: string;
  component?: (value: number) => ReactElement;
};

export const WeatherIndicatorCard = ({
  title,
  icon,
  measurement,
  indicator,
  component,
  todayWeather,
  getDescription,
}: Props) => {
  const currentValue = todayWeather[indicator as keyof TodayWeather] as number;
  return (
    <WeatherCard title={title} icon={icon}>
      <div className="  w-full flex flex-col justify-between h-full text-white min-h-[80px] sm:min-h-[120px] ">
        <div className="h-full w-full flex flex-col justify-between">
          <span className="sm:text-[22px] lg:text-[28px]  text-white font-bold">
            {currentValue} {measurement}
          </span>
          {component && component(currentValue)}
          {getDescription && (
            <p className=" text-[10px]">{getDescription(currentValue)}</p>
          )}
        </div>
      </div>
    </WeatherCard>
  );
};
