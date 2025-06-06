import Head from "next/head";

import {
  fetchHourlyForecast,
  fetchTodayWeather,
  fetchWeeklyWeather,
} from "@/lib/api";
import {
  UvIndex,
  identifyVideoWeather,
  otherWeatheIndicator,
} from "@/constants/weatherIndicators";
import cities from "../../../../cities.json";
import { removeSpacesAndToLower } from "@/utils";
import { LocationSelector } from "@/components/LocationSelector";
import { TodayWeatherCard } from "@/components/TodayWeatherCard";
import { HourlyWeatherContainer } from "@/components/HourlyWeather";
import { WeeklyWeatherContainer } from "@/components/WeeklyWeather";

type Params = {
  params: {
    city: string;
  };
};

export default async function WeatherPage({ params }: Params) {
  const city = params.city;

  if (!city) return <p>Invalid city</p>;

  const location = cities.find(
    (info) => removeSpacesAndToLower(info.city) === city
  );

  if (!location) return <p>Invalid location</p>;

  const todayWeather = await fetchTodayWeather(location);
  const weeklyWeather = await fetchWeeklyWeather(location);
  const hourlyWeather = await fetchHourlyForecast(location);

  const { city: cityName, temp, condition } = todayWeather;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${identifyVideoWeather(condition)})` }}
    >
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
      <main className="w-[85%] h-[95%] flex flex-col items-center  p-[10px] 2xl:w-[70%] sm:w-[80%]">
        <div className="w-full flex items-center justify-end ">
          <LocationSelector initialCity={params.city} />
        </div>
        <div className="w-full flex flex-col items-center justify-center pb-[20px] text-white">
          <h2 className="text-[20px]">{cityName}</h2>
          <span className="text-[45px] font-bold">{temp}°С</span>
          <span>{condition}</span>
        </div>
        <div className="w-full">
          <HourlyWeatherContainer forecast={hourlyWeather} />
          <div className="flex flex-col items-start mt-[10px] justify-between md:flex-row w-full">
            <div className="w-full grid grid-cols-1 gap-[10px] xl:w-[29%] md:w-[39%] md:mr-[10px] md:flex flex-col justify-center sm:grid-cols-2">
              <WeeklyWeatherContainer forecast={weeklyWeather} />
              <div className="">
                <TodayWeatherCard
                  todayWeatherInfo={UvIndex}
                  isUvIndex
                  todayWeather={todayWeather}
                />
              </div>
            </div>
            <div className="w-full mt-[10px] grid grid-cols-2 gap-[10px] mx-auto md:w-[60%] xl:w-[70%] xl:grid-cols-3 md:mt-[0px]">
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
