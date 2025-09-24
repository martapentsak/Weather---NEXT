"use client";

import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Coordinates } from "@/types";
import { buildLocationUrl } from "@/lib/location";
import { locationStorageKey } from "@/constants/location";

export default function Home() {
  const router = useRouter();

  const getLocationFromCoordinates = useCallback(
    async (location: Coordinates) => {
      try {
        const response = await axios(buildLocationUrl(location));
        const city = response.data[0]?.name || "lviv";
        if (typeof window !== "undefined") {
          localStorage.setItem(locationStorageKey, city);
        }
        router.push(`/weather/${city.toLowerCase()}`);
      } catch (error) {
        console.error("Failed to fetch city", error);
        router.push(`/weather/lviv`);
      }
    },
    [router]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLocation = localStorage.getItem(locationStorageKey);
    if (storedLocation) {
      router.push(`/weather/${storedLocation.toLowerCase()}`);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) =>
          getLocationFromCoordinates({ lat, lng }),
        (err) => {
          console.warn("Geolocation failed, fallback to Lviv", err);
          router.push(`/weather/lviv`);
        }
      );
    } else {
      console.warn("Geolocation not supported, fallback to Lviv");
      router.push(`/weather/lviv`);
    }
  }, [getLocationFromCoordinates, router]);

  return <div className="w-full h-full bg-black"></div>;
}
