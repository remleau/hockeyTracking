import MAPBOX_BASE_URL from "../constants/mapbox.js"

// const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_ACCESS_TOKEN = "sk.eyJ1IjoiYWtla28iLCJhIjoiY200OHZxYm9wMDR1ZzJxc2R5bDZzaWNjZCJ9.mkxZyNNPMwWSFw4Rz20FIw"

export const geocodeSearch = async (query) => {

    if(!query) throw new Error('Search query is required')

    const url = new URL(`${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`);
    url.searchParams.set('access_token', MAPBOX_ACCESS_TOKEN || '');
    url.searchParams.set('types', 'address,poi,country,region,district,place,locality,neighborhood');

    const response = await fetch(url.toString())

    if(!response.ok){
        const errorBody = await response.text();
        throw new Error(`Geocoding API error: ${response.status} - ${errorBody}`)
    }

    return response.json()

}