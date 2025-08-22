export type LocationInfo = {
  city: string;
  country: string;
  lat: number;
  lng: number;
};


export type Coordinates = Pick<LocationInfo, "lat" | "lng">;