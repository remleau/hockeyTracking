import { z } from "zod";

// Define step schemas
export const SettingsSchema = [
  z.object({
    address: z.string().nonempty("Home address is required"),
  }),
];
