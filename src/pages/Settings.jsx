import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/InputField";
import {FormProvider} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/lib/SessionWrapper";
import {useSettingsForm} from "@/hooks/useSettingsForm";
import {useAddressAutocomplete} from "@/hooks/useAddressAutocomplete";
import {useGeocodeSearch} from "../hooks/queries/useGeocodeSearch.js";
import {useState} from "react"

export default function Settings() {
    const {session} = useAuth();
    const userId = session?.user?.id;

    // Get the form and submit logic
    const {methods, onSubmit} = useSettingsForm(userId);

    // Get the query and suggestion logic
    // const { query, suggestions, handleInputChange, handleSelectSuggestion } =
    //   useAddressAutocomplete();

    const [searchQuery, setSearchQuery] = useState("")
    const {data, isLoading, error, refetch} = useGeocodeSearch(searchQuery)

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <>
            <PageTitle title={"Settings"}/>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md"
                >
                    <InputField
                        name="home_address"
                        label="Home address:"
                        placeholder="Enter your address"
                        // value={query || methods.getValues().home_address}
                        value={searchQuery}
                        className="w-full"
                        onChange={handleInputChange}
                    />

                    {data && data.features.length > 0 && (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">

                            <ul className="divide-y divide-gray-200">
                                {data.features.map((feature) => (
                                    <li
                                        key={feature.id}
                                        className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-gray-800">{feature.text}</p>
                                                <p className="text-sm text-gray-600">{feature.place_name}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
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
