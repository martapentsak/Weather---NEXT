"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "../../cities.json";

import { useRouter } from "next/navigation";
import { LocationInfo } from "@/types";
import { locationStorageKey } from "@/constants/location";

type Props = {
  value: string;
};

type Location = Pick<LocationInfo, "city" | "country">;

export const LocationSelector = ({ value }: Props) => {
  const router = useRouter();

  const currentLocation = cities.find((v) => v.city === value)!;

  const handleChangeSelectedCity = (value: Location) => {
    if (!value) return;
    const { city } = cities.find((v) => value.city.includes(v.city))!;
    localStorage.setItem(locationStorageKey, city);
    router.push(`/weather/${city.toLowerCase()}`);
  };

  return (
    <Autocomplete
      value={currentLocation}
      onChange={(_event, newValue) => handleChangeSelectedCity(newValue)}
      getOptionKey={(option) => option.city + option.lat}
      options={[...new Set(cities)]}
      getOptionLabel={(option) => `${option.city}, ${option.country}`}
      sx={{ minWidth: 200, width: 300 }}
      renderInput={(params) => (
        <TextField {...params} sx={{ padding: "1px" }} />
      )}
    />
  );
};
