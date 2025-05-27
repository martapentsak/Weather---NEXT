import {
  fetchHourlyForecast,
  fetchTodayWeather,
  fetchWeeklyWeather,
} from "@/app/lib/api";

import { LocationSelector } from "@/app/components/LocationSelector";
import { HourlyWeatherContainer } from "@/app/components/HourlyWeather";
import { WeeklyWeatherContainer } from "@/app/components/WeeklyWeather";

import cities from "../../../../cities.json";
import { TodayWeatherCard } from "@/app/components/TodayWeatherCard";
import {
  UvIndex,
  identifyVideoWeather,
  otherWeatheIndicator,
} from "@/app/constants/weatherIndicator";
import Head from "next/head";

interface Params {
  city: string;
  lat: string;
  lon: string;
}

export default async function WeatherPage({ params }: { params: Params }) {
  const city = params.city;

  if (!city) return <p>Invalid location</p>;

  const location = cities.find(
    (cityInfo) => cityInfo.city.toLowerCase() === city
  );

  const weeklyWeather = await fetchWeeklyWeather(location);
  const hourlyWeather = await fetchHourlyForecast(location);
  const todayWeather = await fetchTodayWeather(location);

  const { city: cityName, temp, condition } = todayWeather;

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Head>
        <title>Weather in {city}</title>
        <meta
          name="description"
          content={`Get the latest forecast for ${city}.`}
        />
        <meta property="og:title" content={`Weather in ${city}`} />
        <meta
          property="og:description"
          content={`Current weather and weekly forecast for ${city}.`}
        />
      </Head>
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={identifyVideoWeather(condition)}
      />
      <main className="w-[70%] h-[95%] flex flex-col items-center  p-[10px] absolute">
        <div className="w-full flex items-center justify-end ">
          <LocationSelector />
        </div>
        <div className="w-full flex flex-col items-center justify-center pb-[10px] text-white">
          <h2 className="text-[20px]">{cityName}</h2>
          <span className="text-[45px] font-bold">{temp}°С</span>
          <span>{condition}</span>
        </div>
        <div className="w-full">
          <HourlyWeatherContainer forecast={hourlyWeather} />
          <div className="w-full flex items-start mt-[10px] justify-between">
            <div className="flex flex-col align-between">
              <WeeklyWeatherContainer forecast={weeklyWeather} />
              <div className="mt-[10px]">
                <TodayWeatherCard
                  todayWeatherInfo={UvIndex}
                  isUvIndex
                  todayWeather={todayWeather}
                />
              </div>
            </div>
            <div className="w-[73%] grid grid-cols-3 gap-[10px]">
              {otherWeatheIndicator.map((todayWeatherInfo, index) => (
                <TodayWeatherCard
                  key={index}
                  todayWeather={todayWeather}
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
