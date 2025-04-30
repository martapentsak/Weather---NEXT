
import { LocationSelector } from "./components/LocationSelector";
import { WeatherCard } from "./components/WeatherCard";
import { LocationProvider } from "./context/location";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

export default function Home() {
  return (
   <div>
    <LocationProvider>
    <LocationSelector/>
    <WeatherCard title="hourly weather" icon={<QueryBuilderIcon/>}>
      <p></p>
    </WeatherCard>
    </LocationProvider>
    </div>
  );
}
