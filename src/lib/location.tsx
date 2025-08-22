import { Coordinates } from "@/types";

export function buildLocationUrl(coordinates: Coordinates): string {
  const { lat, lng } = coordinates;
  const url = new URL("reverse", "https://api.openweathermap.org/geo/1.0/");
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lng.toString());
  url.searchParams.set("limit", "1");
  url.searchParams.set("appid", `${process.env.NEXT_PUBLIC_LOCATION_API}`);
  return url.toString();
}
