import { useState, useRef } from "react";
import axios from "axios";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/InputField";

import { Button } from "@/components/ui/button";

import { SettingsSchema } from "@/components/schemas/pageSettingsSchema";

export default function Settings() {
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Autocomplete results
  const debounceTimeout = useRef(null); // Timeout reference for debouncing

  const methods = useForm({
    resolver: zodResolver(SettingsSchema[0]),
    mode: "onTouched",
    defaultValues: {
      address: "",
    },
  });

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
            countrycodes: ["ca", "us"],
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

    // Debounce API calls
    clearTimeout(debounceTimeout.current); // Clear the previous timeout
    debounceTimeout.current = setTimeout(() => {
      if (value.length >= 6) {
        fetchSuggestions(value); // Only fetch suggestions for input of 4+ characters
      }
    }, 600); // Adjust the debounce delay as needed (500ms is a good default)
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
  };

  return (
    <>
      <PageTitle title={"Settings"} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md"
        >
          <InputField
            name="address"
            label="Home address"
            placeholder="Enter your address"
            value={query}
            className="w-full"
            onChange={handleInputChange}
          />

          {suggestions.length > 0 && (
            <div className="mt-2 border rounded shadow-md bg-white">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.place_id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSelectSuggestion(
                      suggestion.address?.house_number +
                        " " +
                        suggestion.address?.road +
                        ", " +
                        suggestion.address.town +
                        " " +
                        suggestion.address.state +
                        " " +
                        suggestion.address.country
                    )
                  }
                >
                  {suggestion.address?.house_number +
                    " " +
                    suggestion.address?.road +
                    ", " +
                    suggestion.address.town +
                    " " +
                    suggestion.address.state +
                    " " +
                    suggestion.address.country}
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
