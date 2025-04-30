import { LocationSelector } from "../components/LocationSelector";

export const HomePage = () => {
  return (
    <div className="relative w-full h-screen">
      <main className="w-[85%] flex flex-col items-center justify-center p-[10px]">
        <div className="w-full flex items-center justify-end">
          <LocationSelector />
        </div>
      </main>
    </div>
  );
};
