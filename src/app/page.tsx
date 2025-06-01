"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const locationStorageKey = "locationCity"

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    async function detectCity() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const city = data.city?.toLowerCase()
        localStorage.setItem(locationStorageKey, city)
        router.push(`/weather/${city}`);
      } catch (err) {
        console.error(err)
      }
    }
  
    detectCity();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-white">Визначення вашої локації...</p>
    </div>
  );
}
