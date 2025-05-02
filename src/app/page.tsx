import { LocationProvider } from "./context/location";
import { HomePage } from "./pages/HomePage";

export default function Home() {
  return (
    <div>
      <LocationProvider>
        <HomePage />
      </LocationProvider>
    </div>
  );
}
