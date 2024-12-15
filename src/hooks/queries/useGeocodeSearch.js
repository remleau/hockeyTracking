import { useQuery } from "react-query";
import { geocodeSearch } from "../../api/geocoding.js";

export const useGeocodeSearch = (query) => {
  return useQuery(["geocode", query], () => geocodeSearch(query));
};
