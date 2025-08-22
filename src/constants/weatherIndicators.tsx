import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";

import { TodayWeather } from "../lib/api";
import { ReactElement } from "react";
import { PressureIndicator } from "@/components/PressureIndicator";

export const identifyPhotoWeather = (condition: string) => {
  const commonConditions = ["rain", "sun", "cloud", "clear"];
  const currentCondition = commonConditions.find((c) =>
    condition.toLocaleLowerCase().includes(c)
  );
  console.log(currentCondition);
  return `/images/${currentCondition || "cloud"}.jpg`;
};

const getVisibilityDescription = (visibility: number): string => {
  if (visibility >= 10) return "Excellent visibility – it's very clear.";
  if (visibility >= 5) return "Good visibility.";
  if (visibility >= 1) return "Moderate visibility – a bit hazy.";
  return "Low visibility – possibly foggy or misty.";
};

const getWindDescription = (windSpeed: number): string => {
  if (windSpeed >= 50) return "Very strong wind – hold onto your hat!";
  if (windSpeed >= 20) return "Strong wind – noticeable when outside.";
  if (windSpeed >= 5) return "Light breeze – comfortable weather.";
  return "Calm – hardly any wind.";
};

const getHumidityDescription = (humidity: number): string => {
  if (humidity < 30) return "Low humidity – air is dry.";
  if (humidity <= 60) return "Comfortable humidity.";
  if (humidity <= 80) return "High humidity – might feel sticky.";
  return "Very high humidity – possible discomfort.";
};

const getPrecipitationDescription = (value: number): string => {
  if (value === 0) return "No precipitation";
  if (value < 2) return "Light precipitation";
  if (value < 5) return "Moderate precipitation";
  if (value < 10) return "Heavy precipitation";
  return "Very heavy precipitation";
};

export const getUvIndexDescription = (index: number): string => {
  if (index <= 2) return "No protection needed. Safe to be outside.";
  if (index <= 5)
    return "Protect your skin. Use sunscreen and wear a hat and sunglasses.";
  if (index <= 7)
    return "Avoid the sun around midday. Apply sunscreen regularly.";
  if (index <= 10)
    return "Take extra precautions. Limit time in the sun. Wear protective clothing.";
  if (index <= 11) return "Avoid being outside during peak sun hours.";
  return "Avoid being outside during peak sun hours.";
};

type Indicators =
  | "visibility"
  | "feelsLike"
  | "humidity"
  | "precipitation"
  | "wind"
  | "pressure";

type WeatherIndicators = Record<
  Indicators,
  {
    title: string;
    Icon: typeof RemoveRedEyeIcon;
    component?: (value: number) => ReactElement;
    getDescription?: (value: number) => string;
  }
>;

export const weatherIndicators: WeatherIndicators = {
  visibility: {
    title: "Visibility",
    Icon: RemoveRedEyeIcon,
    getDescription: getVisibilityDescription,
  },
  feelsLike: {
    title: "Feels like",
    Icon: RemoveRedEyeIcon,
  },
  humidity: {
    title: "Humidity",
    Icon: OpacityIcon,
    getDescription: getHumidityDescription,
  },
  precipitation: {
    title: "Precipitation",
    Icon: WaterDropIcon,
    getDescription: getPrecipitationDescription,
  },
  wind: {
    title: "Wind",
    Icon: AirIcon,
    getDescription: getWindDescription,
  },
  pressure: {
    title: "Pressure",
    Icon: WaterDropIcon,
    getDescription: getUvIndexDescription,
    component: (value: number) => <PressureIndicator pressure={value} />,
  },
};

const todayWeather = {} as TodayWeather;
Object.entries(weatherIndicators).map(
  ([indicator, { title, Icon, getDescription }]) => {
    return (
      <div>
        <p>{`weatherCondition.${indicator}`}</p>
        <p>{todayWeather[indicator as keyof TodayWeather]}</p>
        {getDescription && (
          <span>
            {getDescription(
              todayWeather[indicator as keyof TodayWeather] as number
            )}
          </span>
        )}
        <Icon style={{}} />
      </div>
    );
  }
);

export const UvIndex = {
  name: "uv",
  title: "uv index",
  icon: <RemoveRedEyeIcon />,
  getDescription: (todayWeather: TodayWeather) =>
    getUvIndexDescription(todayWeather.uv),
};
