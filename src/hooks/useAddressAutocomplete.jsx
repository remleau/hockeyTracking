import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useAddressAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimeout = useRef(null);

  const fetchSuggestions = async (searchText) => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: searchText,
            countrycodes: ["ca", "usa"],
            format: "json",
            addressdetails: 1,
            namedetails: 1,
            limit: 5,
          },
        }
      );

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (value.length >= 6) {
        fetchSuggestions(value);
      }
    }, 600);
  };

  const handleSelectSuggestion = (suggestion) => {
    const address =
      suggestion.address?.house_number +
      " " +
      suggestion.address?.road +
      ", " +
      suggestion.address?.town +
      " " +
      suggestion.address?.state +
      " " +
      suggestion.address?.country;

    setQuery(address);
    setSuggestions([]); // Clear suggestions after selection
  };

  return {
    query,
    setQuery,
    suggestions,
    handleInputChange,
    handleSelectSuggestion,
  };
};
