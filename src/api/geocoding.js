const MAPBOX_BASE_URL = "https://api.mapbox.com";
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const geocodeSearch = async (query) => {
  if (!query) throw new Error("Search query is required");

  const url = new URL(
    `${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json`
  );
  url.searchParams.set("access_token", MAPBOX_ACCESS_TOKEN || "");
  url.searchParams.set(
    "types",
    "address,poi,country,region,district,place,locality,neighborhood"
  );

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Geocoding API error: ${response.status} - ${errorBody}`);
  }

  return response.json();
};
