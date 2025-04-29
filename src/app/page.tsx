
import { LocationSelector } from "./components/LocationSelector";
import { LocationProvider } from "./context/location";

export default function Home() {
  return (
   <main>
    <LocationProvider>
    <LocationSelector/>
    </LocationProvider>
    </main>
  );
}
