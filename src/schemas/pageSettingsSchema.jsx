import { z } from "zod";

// Define step schemas
export const SettingsSchema = [
  z.object({
    home_address: z.string().nonempty("Home address is required"),
    test: z.string().nonempty("Test is required"),
  }),
];
