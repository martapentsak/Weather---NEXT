"use client";

import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import cities from "../../../cities.json";
import { Location } from "../types";

type ProviderValues = {
  location: Location | null;
  handleChangeSelectedCity: (value: string | null) => void;
};

type Props = {
  children: ReactNode;
};

export const LocationContext = createContext({} as ProviderValues);

const locationStorageKey = "location";

export const LocationProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<Location | null>(null);

  const handleChangeSelectedCity = async (value: string | null) => {
    if (!value) return;
    const location = cities.find((v) => value.includes(v.city));
    const newLocation = {
      city: location.city,
      country: location.country,
      latitude: location.lat,
      longitude: location.lng,
    };
    setLocation(newLocation);
    localStorage.setItem(locationStorageKey, JSON.stringify(newLocation));
  };

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
    navigator.geolocation.getCurrentPosition(async (position) => {
      getLocationFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }, []);

  async function getLocationFromCoordinates(
    latitude: number,
    longitude: number
  ) {
    const storedLocation = localStorage.getItem(locationStorageKey);
    if (storedLocation) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=93ff8c87416b2085fe5cb5665bf8658d`
      );
      const { name, country, lat, lon } = response.data[0];
      const locationFromCoordinates = {
        city: name,
        country: country,
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

  const providerValues: ProviderValues = {
    location,
    handleChangeSelectedCity,
  };

  return (
    <LocationContext.Provider value={providerValues}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const locationContext = useContext(LocationContext);

  if (!locationContext) {
    throw Error("Location context is not found");
  }
  return locationContext;
};
