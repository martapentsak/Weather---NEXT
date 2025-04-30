
import { LocationSelector } from "./components/LocationSelector";
import { WeatherCard } from "./components/WeatherCard";
import { LocationProvider } from "./context/location";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { HomePage } from "./pages/HomePage";

export default function Home() {
  return (
   <div>
    <LocationProvider>
<HomePage/>
    </LocationProvider>
    </div>
  );
}
