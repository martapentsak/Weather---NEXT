"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import cities from "../../../../cities.json";
import { useLocation } from "@/app/context/location";

export const LocationSelector = () => {
  const { location, handleChangeSelectedCity } = useLocation();

  const [inputValue, setInputValue] = useState<string>(
    `${(location?.city, location?.country)}`
  );

  return (
    <div>
      <Autocomplete
        value={
          location ? location.city + ", " + location.country : "Detecting city"
        }
        onChange={(_event: any, newValue: string | null) => {
          handleChangeSelectedCity(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={cities.map(
          (city) => `${city.city}, ${city.country}, ${city.province}`
        )}
        sx={{ minWidth: 200, width: 300 }}
        renderInput={(params) => (
          <TextField {...params} sx={{ padding: "1px" }} />
        )}
      />
    </div>
  );
};
