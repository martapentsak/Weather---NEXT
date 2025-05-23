"use client";

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

  const { fetchWeather } = useWeather();

  const formatCityLabel = (location: Location) =>
    `${location.city}, ${location.country}`;

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const cityObj = cities.find((v) => value.includes(v.city));
    if (!cityObj) return;
    const newLocation = {
      city: cityObj.city,
      country: cityObj.country,
      latitude: cityObj.lat,
      longitude: cityObj.lng,
    };
    setLocation(newLocation);
    localStorage.setItem(locationStorageKey, JSON.stringify(newLocation));
    fetchWeather(newLocation);
  };

  const getLocationFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const res = await fetch(`/api/location?lat=${latitude}&lon=${longitude}`);
      if (!res.ok) throw new Error("Failed to fetch city");
      const data = await res.json();
      const locationFromCoordinates = {
        city: data.name,
        country: data.country,
        latitude: data.lat,
        longitude: data.lon,
      };
      setLocation(locationFromCoordinates);
      localStorage.setItem(
        locationStorageKey,
        JSON.stringify(locationFromCoordinates)
      );
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
        fetchWeather(parsedStoredLocation);
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
