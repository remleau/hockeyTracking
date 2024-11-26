import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/InputField";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/SessionWrapper";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";

export default function Settings() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  // Get the form and submit logic
  const { methods, onSubmit } = useSettingsForm(userId);

  // Get the query and suggestion logic
  const { query, suggestions, handleInputChange, handleSelectSuggestion } =
    useAddressAutocomplete();

  return (
    <>
      <PageTitle title={"Settings"} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md"
        >
          <InputField
            name="home_address"
            label="Home address:"
            placeholder="Enter your address"
            value={query || methods.getValues().home_address}
            className="w-full"
            onChange={handleInputChange}
          />

          {suggestions.length > 0 && (
            <div className="mt-2 mb-6 border rounded shadow-md bg-white">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.place_id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
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

          <InputField
            name="test"
            label="test"
            placeholder="Enter your address"
            className="w-full"
          />

          <div className="flex justify-between mt-6">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
