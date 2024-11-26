import { useEffect } from "react";

import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"; // Optional utility for conditional classes
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputField({
  name,
  label,
  type = "text",
  onChange,
  value,
}) {
  const { register, formState, setValue } = useFormContext();
  const error = formState.errors[name]?.message;

  useEffect(() => {
    setValue(name, value);
  }, [value]);

  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        id={name}
        type={type}
        value={value}
        {...register(name, {
          onChange: (e) => {
            // Call the parent-provided onChange handler if provided
            if (onChange) {
              onChange(e);
            }

            // Optionally, use setValue to update the form state
            setValue(name, e.target.value, { shouldValidate: true });
          },
        })}
        className={cn(error && "border-red-500")}
        autoComplete="section-user1 billing postal-code"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
