import { LocationSelector } from "./components/LocationSelector";
import { LocationProvider } from "./context/location";

export default function Home() {
  return (
    <div>
      <LocationProvider>
        <LocationSelector />
      </LocationProvider>
    </div>
  );
}
