"use client";

import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Coordinates } from "@/types";
import { buildLocationUrl } from "@/lib/location";
import { locationStorageKey } from "@/constants/location";


export default function Home() {
  const router = useRouter();

  const getLocationFromCoordinates = useCallback(async (location: Coordinates) => {
    try {
      const response = await axios(buildLocationUrl(location));
      const { name: city } = response.data[0];
      localStorage.setItem(locationStorageKey, city);
      router.push(`/weather/${city.toLowerCase()}`);
    } catch (error) {
      console.error("Failed to fetch city", error);
    }
  }, [router]);

  useEffect(() => {
    const storedLocation = localStorage.getItem(locationStorageKey);
    if (storedLocation) {
      return router.push(`/weather/${storedLocation.toLowerCase()}`);
    }

    (() => {
      if (!navigator.geolocation)
        return console.warn("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) =>
          getLocationFromCoordinates({ lat, lng })
      );
    })();
  }, [router]);

  return <div className="w-full h-full bg-black"></div>;
}
