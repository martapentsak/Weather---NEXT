"use client";
import { LocationSelector } from "../components/LocationSelector";

export const HomePage = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <main className="w-[60%] h-[90%] flex flex-col items-center  p-[10px]">
        <div className="w-full flex items-center justify-end">
          <LocationSelector />
        </div>
      </main>
    </div>
  );
};
