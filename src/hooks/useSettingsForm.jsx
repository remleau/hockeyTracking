import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas/pageSettingsSchema";
import supabase from "@/lib/supabase";

export const useSettingsForm = (userId) => {
  const methods = useForm({
    resolver: zodResolver(SettingsSchema[0]),
    mode: "onTouched",
    defaultValues: {
      home_address: "",
      test: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("home_address")
        .eq("id", userId)
        .single();

      if (!error) {
        methods.setValue("home_address", data?.home_address || "");
        methods.setValue("test", data?.home_address || "");
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const onSubmit = async (formData) => {
    const { data, error } = await supabase.from("user_profiles").upsert({
      id: userId,
      home_address: formData.home_address,
    });

    if (error) {
      console.error("Error updating custom field:", error.message);
    } else {
      console.log("Custom field added:", formData);
    }
  };

  return { methods, onSubmit };
};
