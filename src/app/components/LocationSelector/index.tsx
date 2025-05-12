"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import cities from "../../../../cities.json";
import { Location } from "../../types";

const locationStorageKey = "location";

export const LocationSelector = () => {
  const [location, setLocation] = useState<Location | null>(null);

  if (!location) return null;

  const { city, country } = location;

  const formattedLocation = city + ", " + country;

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const { city, country, lat, lng } = cities.find((v) =>
      value.includes(v.city)
    );
    const newLocation = {
      city,
      country,
      latitude: lat,
      longitude: lng,
    };
    setLocation(newLocation);
    localStorage.setItem(locationStorageKey, JSON.stringify(newLocation));
  };

  async function getLocationFromCoordinates(
    latitude: number,
    longitude: number
  ) {
    const storedLocation = localStorage.getItem(locationStorageKey);
    if (storedLocation) return;
    try {
      const response = await fetchLocationFromCoords(latitude, longitude);
      const { name, country, lat, lon } = response;
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
      console.error("Failed to fetch city");
    }
  }

  useEffect(() => {
    const storedLocation = localStorage.getItem(locationStorageKey);
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
      return;
    }
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      getLocationFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }, []);

  return (
    <Autocomplete
      value={location?.city ? formattedLocation : "Detecting city"}
      onChange={(_event: any, newValue: string | null) => {
        handleChangeSelectedCity(newValue);
      }}
      options={cities.map((city) => `${city.city}, ${city.country}`)}
      sx={{ minWidth: 200, width: 300 }}
      renderInput={(params) => (
        <TextField {...params} sx={{ padding: "1px" }} />
      )}
    />
  );
};

async function fetchLocationFromCoords(latitude: number, longitude: number) {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );
  return response.data[0];
}
