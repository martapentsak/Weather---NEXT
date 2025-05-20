"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import cities from "../../../../cities.json";
import { Location } from "../../types";
import { useWeather } from "@/app/context/weather";

const locationStorageKey = "location";

export const LocationSelector = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [mounted, setMounted] = useState(false);

  const { getHourlyWeather, getWeeklyWeather } = useWeather();

  const formatCityLabel = (location: Location) =>
    `${location.city}, ${location.country}`;

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const cityObj = cities.find((v) => value.includes(v.city));
    if (!cityObj) return;

    const { city, country, lat, lng } = cityObj;
    const newLocation = {
      city,
      country,
      latitude: lat,
      longitude: lng,
    };
    setLocation(newLocation);
    localStorage.setItem(locationStorageKey, JSON.stringify(newLocation));
    getHourlyWeather(newLocation);
  };

  const getLocationFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const { name, country, lat, lon } = await fetchLocationFromCoords(
        latitude,
        longitude
      );
      const locationFromCoordinates = {
        city: name,
        country,
        latitude: lat,
        longitude: lon,
      };
      setLocation(locationFromCoordinates);
      localStorage.setItem(
        locationStorageKey,
        JSON.stringify(locationFromCoordinates)
      );
      getHourlyWeather(locationFromCoordinates);
      getWeeklyWeather(locationFromCoordinates)
    } catch (error) {
      console.error("Failed to fetch city", error);
    }
  };

  useEffect(() => {
    setMounted(true);

    const initLocation = () => {
      const storedLocation = localStorage.getItem(locationStorageKey);
      if (storedLocation) {
        const parsedStoredLocation = JSON.parse(storedLocation);
        setLocation(parsedStoredLocation);
        getHourlyWeather(parsedStoredLocation);
        getWeeklyWeather(parsedStoredLocation)
        return;
      }

      if (!navigator.geolocation) {
        console.warn("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition((pos) => {
        getLocationFromCoordinates(pos.coords.latitude, pos.coords.longitude);
      });
    };

    initLocation();
  }, []);

  if (!mounted) return null;

  return (
    <Autocomplete
      value={location ? formatCityLabel(location) : "Detecting location..."}
      onChange={(_event: any, newValue: string | null) => {
        handleChangeSelectedCity(newValue);
      }}
      options={cities.map((city) => formatCityLabel(city))}
      sx={{ minWidth: 200, width: 300 }}
      renderInput={(params) => (
        <TextField {...params} sx={{ padding: "1px" }} />
      )}
    />
  );
};

async function fetchLocationFromCoords(latitude: number, longitude: number) {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_LOCATION_API}`
  );
  return response.data[0];
}
