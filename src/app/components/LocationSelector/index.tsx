"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import cities from "../../../../cities.json";
import { Location } from "../../types";
import axios from "axios";

const locationStorageKey = "location";

export const LocationSelector = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const formatCityLabel = (location: Location) =>
    `${location.city}, ${location.country}`;

  const uniqueCities = Array.from(
    new Map(cities.map((c) => [`${c.city},${c.country}`, c])).values()
  );

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
  };

  const getLocationFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const res = await axios(`/api/location?lat=${latitude}&lon=${longitude}`);
      const { name, country, lat, lon } = await res.data;
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
    } catch (error) {
      console.error("Failed to fetch city", error);
    }
  };

  useEffect(() => {
    const initLocation = () => {
      const storedLocation = localStorage.getItem(locationStorageKey);
      if (storedLocation) {
        const parsedStoredLocation = JSON.parse(storedLocation);
        setLocation(parsedStoredLocation);
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

  return (
    <Autocomplete
      value={location ? formatCityLabel(location) : "Detecting location..."}
      onChange={(_event: any, newValue: string | null) => {
        handleChangeSelectedCity(newValue);
      }}
      options={uniqueCities.map((city) => formatCityLabel(city))}
      sx={{ minWidth: 200, width: 300 }}
      renderInput={(params) => (
        <TextField {...params} sx={{ padding: "1px" }} />
      )}
    />
  );
};
