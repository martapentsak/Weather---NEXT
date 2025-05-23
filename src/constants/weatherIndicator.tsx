import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from '@mui/icons-material/Air';
import { TodayWeather } from "@/app/context/weather";

export const identifyVideoWeather = (condition: string) => {
  if (condition.toLowerCase().includes("rain")) return "/images/rain.jpg";
  if (condition.toLowerCase().includes("sun")) return "/images/sunny.jpg";
  if (condition.toLowerCase().includes("cloud")) return "/images/cloud.jpg";
  if (condition.toLowerCase().includes("drizzle")) return "/images/drizzle.jpg";
  return "/images/sunny.jpg";
};

export const getVisibilityComment = (visibility: number): string => {
  if (visibility >= 10000) return "Excellent visibility – it's very clear.";
  if (visibility >= 5000) return "Good visibility.";
  if (visibility >= 1000) return "Moderate visibility – a bit hazy.";
  return "Low visibility – possibly foggy or misty.";
};

export const getWindComment = (windSpeed: number): string => {
  if (windSpeed >= 50) return "Very strong wind – hold onto your hat!";
  if (windSpeed >= 20) return "Strong wind – noticeable when outside.";
  if (windSpeed >= 5) return "Light breeze – comfortable weather.";
  return "Calm – hardly any wind.";
};

export const getHumidityComment = (humidity: number): string => {
  if (humidity < 30) return "Low humidity – air is dry.";
  if (humidity <= 60) return "Comfortable humidity.";
  if (humidity <= 80) return "High humidity – might feel sticky.";
  return "Very high humidity – possible discomfort.";
};

export const getPrecipitationDescription = (value: number): string => {
  if (value === 0) return "No precipitation";
  if (value < 2) return "Light precipitation";
  if (value < 5) return "Moderate precipitation";
  if (value < 10) return "Heavy precipitation";
  return "Very heavy precipitation";
};

export const otherWeatheIndicator = [
  {
    name: "visibility",
    title: "visibility",
    icon: <RemoveRedEyeIcon />,
    getDescription: (todayWeather: TodayWeather) =>
      getVisibilityComment(todayWeather.visibility),
  },
  {
    name: "feelsLike",
    title: "feels like",
    icon: <RemoveRedEyeIcon />,
    getDescription: (todayWeather: TodayWeather) =>
      getVisibilityComment(todayWeather.feelsLike),
  },
  {
    name: "humidity",
    title: "humidity",
    icon: <OpacityIcon />,
    getDescription: (todayWeather: TodayWeather) =>
      getHumidityComment(todayWeather.humidity),
  },
  {
    name: "precipitation",
    title: "precipitation",
    icon: <WaterDropIcon />,
    getDescription: (todayWeather: TodayWeather) =>
      getPrecipitationDescription(todayWeather.precipitation),
  },
  {
    name: "wind",
    title: "wind",
    icon: <AirIcon />,
    getDescription: (todayWeather: TodayWeather) =>
    getWindComment(todayWeather.precipitation),
  },
  {
    name: "pressure",
    title: "pressure",
    icon: <WaterDropIcon />,
    getDescription: (todayWeather: TodayWeather) =>
      getPrecipitationDescription(todayWeather.precipitation),
  },
];

export const UvIndex = {
  name: "uv",
  title: "uv index",
  icon: <RemoveRedEyeIcon />,
  getDescription: (todayWeather: TodayWeather) =>
    getVisibilityComment(todayWeather.feelsLike),
};
