import { Coordinates, LocationInfo } from "@/types";
import axios from "axios";

type HourlyWeatherResponse = {
  temp_c: number;
  time: string;
  condition: {
    icon: string;
  };
};

export type HourlyWeather = Pick<HourlyWeatherResponse, "time"> & {
  temp: number;
  icon: string;
};

export type WeeklyWeather = {
  minTemp: number;
  maxTemp: number;
  day: string;
  icon: string;
};

type WeeklyWeatherResponse = {
  date: string;
  date_epoch: number;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: { icon: string };
  };
};

type UrlInfo = {
  location: Coordinates;
  days: number;
};

export type TodayWeather = {
  temp: number;
  wind: number;
  pressure: number;
  humidity: number;
  feelsLike: number;
  uv: number;
  visibility: number;
  condition: string;
  city: string;
  precipitation: number;
};

const baseUrl = "https://api.weatherapi.com/v1/forecast.json";

function buildLocationUrl(urlInfo: UrlInfo): string {
  const {
    location: { lat, lng },
    days,
  } = urlInfo;
  const url = new URL(baseUrl);
  url.searchParams.set("key", `${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
  url.searchParams.set("q", `${lat},${lng}`);
  url.searchParams.set("days", `${days}`);
  url.searchParams.set("aqi", "no");
  url.searchParams.set("alerts", "no");
  return url.toString();
}

async function fetchForecast(urlInfo: UrlInfo) {
  try {
    const response = await axios.get(buildLocationUrl(urlInfo));
    return response.data;
  } catch (error) {
    console.error("fetchForecast", error);
  }
}

function mapWeeklyForecast(forecast: WeeklyWeatherResponse[]) {
  return forecast.map(
    (
      {
        date_epoch,
        day: {
          mintemp_c,
          maxtemp_c,
          condition: { icon },
        },
      }: WeeklyWeatherResponse,
      index: number
    ) => {
      const dayName = new Date(date_epoch * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      }); //from 1746144000 to day like sunday
      return {
        minTemp: Math.round(mintemp_c),
        maxTemp: Math.round(maxtemp_c),
        icon: `http:${icon}`,
        day: index === 0 ? "Today" : dayName,
      };
    }
  );
}

export async function fetchWeeklyWeather(location: LocationInfo) {
  const {
    forecast: { forecastday },
  } = await fetchForecast({ location, days: 10 });
  return mapWeeklyForecast(forecastday);
}

export async function fetchHourlyForecast(
  location: LocationInfo
): Promise<HourlyWeather[]> {
  const {
    forecast: { forecastday },
    location: loc,
  } = await fetchForecast({ location, days: 2 });
  const nowHours = new Date(loc.localtime).getHours();
  const [today, tomorrow] = forecastday;
  const todayHourlyWeather = today.hour.slice(nowHours);
  const tommorowHourlyWeather = tomorrow.hour.slice(
    0,
    25 - todayHourlyWeather.length
  );
  // The hourlyWeather array is created by combining today's remaining hours and the first hours of tomorrow, ensuring it always contains 24
  //   consecutive hours of forecast data starting from the current hour.
  const hourlyWeather = [...todayHourlyWeather, ...tommorowHourlyWeather].map(
    ({ temp_c, time, condition }: HourlyWeatherResponse, index: number) => {
      return {
        temp: Math.round(temp_c),
        time: index === 0 ? "Now" : time.slice(11, 13),
        icon: `https:${condition.icon}`,
      };
    }
  );

  return hourlyWeather;
}

export async function fetchTodayWeather(location: LocationInfo) {
  const {
    forecast: { forecastday },
    location: loc,
  } = await fetchForecast({ location, days: 1 });
  const nowHours = loc.localtime.slice(11, 13); //16:15 => 16
  const {
    temp_c,
    wind_kph,
    pressure_mb,
    humidity,
    feelslike_c,
    uv,
    vis_km,
    precip_mm,
    condition: { text },
  } = forecastday[0].hour.slice(nowHours)[0]; //currentHourWeather
  return {
    temp: Math.round(temp_c),
    wind: Math.round(wind_kph),
    pressure: pressure_mb,
    humidity,
    feelsLike: Math.round(feelslike_c),
    uv: Math.round(uv),
    visibility: vis_km,
    condition: text,
    city: location.city,
    precipitation: Math.round(precip_mm),
  };
}
