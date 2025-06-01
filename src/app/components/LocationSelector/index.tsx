"use client";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "../../../../cities.json";
import { useRouter } from "next/navigation";
import Loading from "@/app/weather/[city]/loading";

type Location = {
  city: string;
  country: string;
};

const uniqueCities = Array.from(
  new Map(cities.map((c) => [`${c.city},${c.country}`, c])).values()
);

type Props = {
  initialCity: string;
};

export const LocationSelector = ({ initialCity }: Props) => {
  const router = useRouter();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const { city, country } = uniqueCities.find(
      (info) => info.city.toLowerCase() === initialCity.toLowerCase()
    );
    if (city && country) {
      setLocation({ city, country });
    }
  }, [initialCity]);

  const formatCityLabel = (location: Location) =>
    `${location.city}, ${location.country}`;

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const cityObj = cities.find((v) => value.includes(v.city));
    if (!cityObj) return;
    const { city, country } = cityObj;
    setLocation({ city, country });
    router.push(`/weather/${city.toLowerCase()}`);
  };

  if (!location) {
    console.log(location);
    return <Loading />;
  }

  console.log();

  return (
    <Autocomplete
      value={formatCityLabel(location)}
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
