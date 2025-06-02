"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

export const locationStorageKey = "locationCity";
export const CARD_HEIGHT = 10;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // TODO: better move to seledctor and use it for initial
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const city = data.city?.toLowerCase();
        localStorage.setItem(locationStorageKey, city);
        router.push(`/weather/${city}`);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <></>
      <p className="text-white">Визначення вашої локації...</p>
    </div>
  );
}
