import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Optional utility for conditional classes

import PageTitle from "@/components/PageTitle";

// Define step schemas
const schemas = [
  z.object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
  }),
  z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .min(10, "Phone number must be at least 10 digits"),
  }),
  z
    .object({
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .nonempty(),
      confirmPassword: z.string().nonempty("Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
];

// Step Components
function Step1() {
  return (
    <>
      <InputField name="firstName" label="date" />
      <InputField name="firstName" label="Where did i play" />
      <InputField name="lastName" label="which team" />
      <InputField name="lastName" label="which color" />
    </>
  );
}

function Step2() {
  return (
    <>
      <InputField name="email" label="Email Address" />
      <InputField name="phone" label="Phone Number" />
    </>
  );
}

function Step3() {
  return (
    <>
      <InputField name="password" label="Password" type="password" />
      <InputField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
      />
    </>
  );
}

// InputField Component
function InputField({ name, label, type = "text" }) {
  const { register, formState } = useFormContext();
  const error = formState.errors[name]?.message;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        className={cn(error && "border-red-500")}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default function AddMatch() {
  const [step, setStep] = useState(0); // Step index starts at 0
  const isLastStep = step === schemas.length - 1;
  const isFirstStep = step === 0;

  const methods = useForm({
    resolver: zodResolver(schemas[step]),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    alert("Form submitted successfully!");
  };

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div>
      <PageTitle title={"Match"} icon="Bandage" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto p-6"
        >
          <h1 className="text-xl font-bold mb-4">
            Step {step + 1} of {schemas.length}
          </h1>

          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}

          <div className="flex justify-between mt-6">
            {!isFirstStep && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {!isLastStep ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
