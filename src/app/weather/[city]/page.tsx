import Head from "next/head";
import {
  fetchHourlyForecast,
  fetchTodayWeather,
  fetchWeeklyWeather,
} from "@/lib/api";
import {
  getUvIndexDescription,
  identifyPhotoWeather,
  weatherIndicators,
} from "@/constants/weatherIndicators";
import cities from "../../../../cities.json";
import { LocationSelector } from "@/components/LocationSelector";
import { WeatherIndicatorCard } from "@/components/WeatherIndicatorCard";
import { HourlyWeather } from "@/components/HourlyWeather";
import { WeeklyWeather } from "@/components/WeeklyWeather";
import { UvIndicator } from "@/components/UvIndexIndicator";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";



export default async function WeatherPage({ params }: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city)

  console.log(process.env.NEXT_PUBLIC_LOCATION_API);

  if (!decodedCity) return <p>Invalid city</p>;

  const location = cities.find(
    (info) => info.city.toLowerCase() === decodedCity.toLowerCase()
  );

  if (!location) return <p>Invalid location</p>;

  const [todayWeather, weeklyWeather, hourlyWeather] = await Promise.all([
    fetchTodayWeather(location),
    fetchWeeklyWeather(location),
    fetchHourlyForecast(location),
  ]);

  const { city: cityName, temp, condition, uv } = todayWeather;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${identifyPhotoWeather(condition)})` }}
    >
      <Head>
        <title>Weather in {cityName}</title>
        <meta
          name="description"
          content={`Get the latest forecast for ${cityName}.`}
        />
        <meta property="og:title" content={`Weather in ${cityName}`} />
        <meta
          property="og:description"
          content={`Current weather and weekly forecast for ${cityName}.`}
        />
      </Head>
      <main className="w-[85%] h-[95%] flex flex-col items-center  p-[10px] 2xl:w-[70%] sm:w-[80%]">
        <div className="w-full flex items-center justify-end mb-[20px]">
          <LocationSelector value={cityName} />
        </div>
        <div className="w-full flex flex-col items-center justify-center pb-[20px] text-white">
          <h2 className="text-[20px]">{cityName}</h2>
          <span className="text-[40px] font-bold  sm:text-[45px]">
            {temp}°С
          </span>
          <span>{condition}</span>
        </div>
        <div className="w-full">
          <HourlyWeather forecast={hourlyWeather} />
          <div className="flex flex-col items-start mt-[10px] justify-between md:flex-row w-full">
            <div className="w-full grid grid-cols-1 gap-[10px] xl:w-[29%] md:w-[39%] md:mr-[10px] md:flex flex-col justify-center sm:grid-cols-2">
              <WeeklyWeather forecast={weeklyWeather} />
              <div className="">
                <WeatherIndicatorCard
                  title="Uv index"
                  component={(uv) => <UvIndicator uv={uv} />}
                  todayWeather={todayWeather}
                  indicator={"uv"}
                  icon={<RemoveRedEyeIcon />}
                  getDescription={() => getUvIndexDescription(uv)}
                />
              </div>
            </div>
            <div className="w-full mt-[10px] grid grid-cols-2 gap-[10px] mx-auto md:w-[60%] xl:w-[70%] xl:grid-cols-3 md:mt-[0px]">
              {Object.entries(weatherIndicators).map(
                (
                  [indicator, { Icon, title, getDescription, component }],
                  index
                ) => (
                  <WeatherIndicatorCard
                    key={index}
                    title={title}
                    component={component}
                    todayWeather={todayWeather}
                    indicator={indicator}
                    icon={<Icon />}
                    getDescription={getDescription}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
