"use client";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "../../cities.json";
import { useRouter } from "next/navigation";
import Loading from "@/app/weather/[city]/loading";
import { removeSpacesAndToLower } from "@/utils";
import { LocationInfo } from "@/types";

type Location = Pick<LocationInfo, "city" | "country">;

type Props = {
  initialCity: string;
};

export const LocationSelector = ({ initialCity }: Props) => {
  const router = useRouter();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const { city, country } = cities.find(
      (info) => removeSpacesAndToLower(info.city) === initialCity
    );
    if (city && country) {
      setLocation({ city, country });
    }
  }, []);

  const formatCityLabel = (location: Location) =>
    `${location.city}, ${location.country}`;

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const cityObj = cities.find((v) => value.includes(v.city));
    if (!cityObj) return;
    const { city, country } = cityObj;
    setLocation({ city, country });
    router.push(`/weather/${removeSpacesAndToLower(city)}`);
  };

  if (!location) {
    return <Loading />;
  }

  return (
    <Autocomplete
      value={location ? formatCityLabel(location) : "Detecting location"}
      onChange={(_event: any, newValue: string | null) => {
        handleChangeSelectedCity(newValue);
      }}
      options={cities.map((city) => formatCityLabel(city))}
      getOptionKey={(option: string) => option + Math.random()}
      sx={{ minWidth: 200, width: 300 }}
      renderInput={(params) => (
        <TextField {...params} sx={{ padding: "1px" }} />
      )}
    />
  );
};
