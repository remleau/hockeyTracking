import { useState } from "react";

import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/form/multiSelect";

import { FormProvider } from "react-hook-form";

import { useAuth } from "@/lib/SessionWrapper";
import { useGeocodeSearch } from "../hooks/queries/useGeocodeSearch.js";
import useSettingsForm from "../hooks/useSettings.jsx";

export default function Settings() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { methods, status, error, onSubmit, game_days, searchResult } =
    useSettingsForm(userId);

  const [searchQueryVisible, setSearchQueryVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useGeocodeSearch(searchQuery);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestion = (suggestion) => {
    methods.setValue("home_address", {
      place_name: suggestion.place_name,
      coordinates: `${suggestion.geometry.coordinates[0]}, ${suggestion.geometry.coordinates[1]}`,
    });

    setSearchQueryVisible(false);
    setSearchQuery("");
  };

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <PageTitle title={"Settings"} icon="Settings" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto px-4 py-6 bg-white shadow-sm rounded-sm"
        >
          {searchQueryVisible ? (
            <InputField
              name="home_address"
              label={`Home address:`}
              value={methods.getValues().home_address}
              placeholder="Enter your address"
              className="w-full"
              onChange={handleInputChange}
            />
          ) : (
            <InputField
              name="home_address2"
              label={`Home address:`}
              value={
                methods.getValues().home_address?.place_name || searchResult
              }
              placeholder="Enter your address"
              className="w-full"
              disabled
            />
          )}
          {data && data.features.length > 0 && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {data.features.map((feature) => (
                  <li
                    key={feature.id}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleSuggestion(feature)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-800">
                          {feature.text}
                        </p>
                        <p className="text-sm text-gray-600">
                          {feature.place_name}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="w-[100%]">
            <ComboboxDemo
              name="game_days"
              label="Select weekly game day"
              game_days={game_days}
              methods={methods}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              className="absolute w-full left-0 mt-12 shadow-sm"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving ..." : "Save"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
