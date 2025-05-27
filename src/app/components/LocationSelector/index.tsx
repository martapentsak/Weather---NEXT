"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import cities from "../../../../cities.json";

import { useParams, useRouter } from "next/navigation";
import { Location } from "@/app/lib/api";

type LocationInfo = Pick<Location, "city" | "country">;

const uniqueCities = Array.from(
  new Map(cities.map((c) => [`${c.city},${c.country}`, c])).values()
);

export const LocationSelector = () => {
  const params = useParams();
  const { city, country } = uniqueCities.find(
    (info) => info.city.toLowerCase() === params.city
  )!;
  const [location, setLocation] = useState<LocationInfo>({
    city,
    country,
  });

  const router = useRouter();

  const formatCityLabel = (location: LocationInfo) =>
    `${location.city}, ${location.country}`;

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const cityObj = cities.find((v) => value.includes(v.city));
    if (!cityObj) return;
    const { city, country } = cityObj;
    setLocation({ city, country });
    router.push(`/weather/${city.toLowerCase()}`);
  };

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
