"use client";
import { LocationSelector } from "./components/LocationSelector";


export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <main className="w-[70%] h-[95%] flex flex-col items-center  p-[10px] absolute">
        <div className="w-full flex items-center justify-end ">
          <LocationSelector />
        </div>
     
      </main>
    </div>
  );
}
