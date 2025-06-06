"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const locationStorageKey= "location"

export default function Home() {
  const router = useRouter();

  async function getLocationFromCoordinates(
    latitude: number,
    longitude: number
  ) {
    try {
      const response = await axios(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_LOCATION_API}`
      );
      response.data[0];
      const { name: city, country } = response.data[0];
      localStorage.setItem(locationStorageKey, JSON.stringify({city, country}))
      router.push(`/weather/${city.toLowerCase()}`);
    } catch (error) {
      console.error("Failed to fetch city", error);
    }
  }

  

  useEffect(() => {
    (() => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported");
        return;
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        getLocationFromCoordinates(pos.coords.latitude, pos.coords.longitude);
      });
    })();
  }, []);

  return <div className="w-full h-full bg-black"></div>;
}
