import { LocationSelector } from "../components/LocationSelector";

export const HomePage = () => {
  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={"/videos/cloudWeather.mp4"} type="video/mp4" />
      </video>
      <main className="w-[85%] flex flex-col items-center justify-center p-[10px]">
        <div className="w-full flex items-center justify-end">
          <LocationSelector />
        </div>
      </main>
    </div>
  );
};
