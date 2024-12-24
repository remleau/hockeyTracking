import { useEffect, useState } from "react";

import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas/pageSettingsSchema";

import { useAuth } from "@/lib/SessionWrapper";
import { useGeocodeSearch } from "../hooks/queries/useGeocodeSearch.js";

import { useSelector, useDispatch } from "react-redux";
import { fetchSettings, upsertSettings } from "@/lib/slices/settingsSlice";

export default function Settings() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const dispatch = useDispatch();

  const { home_address, game_days, searchResult, status, error } = useSelector(
    (state) => state.settings
  );

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      home_address: "",
      game_days: "",
    },
  });

  const { reset } = methods;

  useEffect(() => {
    dispatch(fetchSettings(userId));
  }, [userId]);

  // Populate form fields when settings data is successfully fetched
  useEffect(() => {
    if (status === "succeeded") {
      reset({
        home_address: home_address?.place_name || "",
        game_days: game_days || "",
      });
    }
  }, [home_address, game_days, status, reset]);

  const onSubmit = (formData) => {
    console.log("Form Data:", formData);

    const homeAddress =
      typeof formData.home_address === "string" &&
      formData.home_address.trim() !== ""
        ? undefined
        : formData.home_address; // Only include home_address if it's a non-empty string

    // Extract gameDays from formData and check if it's a valid non-empty array
    const gameDays =
      Array.isArray(formData.game_days) && formData.game_days.length > 0
        ? formData.game_days
        : undefined; // Set to undefined if it's not a valid array or empty

    // Dispatch the upsertSettings thunk
    dispatch(
      upsertSettings({ userId, home_address: homeAddress, game_days: gameDays })
    );
  };

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
      <PageTitle title={"Settings"} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md"
        >
          {searchQueryVisible ? (
            <InputField
              name="home_address"
              label={`Home address:`}
              value={methods.getValues()?.home_address}
              placeholder="Enter your address"
              className="w-full"
              onChange={handleInputChange}
            />
          ) : (
            <div className="flex justify-between items-start pt-2">
              <div>
                <Label>Home address:</Label>
                <p className="font-medium text-gray-600">
                  {methods.getValues()?.home_address?.place_name ||
                    searchResult}
                </p>
              </div>
            </div>
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
          <div className="flex justify-between mt-6">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Saving ..." : "Save"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
