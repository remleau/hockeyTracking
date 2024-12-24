import { z } from "zod";

// Define step schemas
export const SettingsSchema = [
  z.object({
    home_address: z
      .union([
        z.string().nonempty("Home address cannot be empty"), // When home_address is a non-empty string
        z
          .object({
            place_name: z.string().nonempty("Home address is required"),
            coordinates: z.string().nonempty("Coordinates are required"),
          })
          .optional(), // When home_address is an object
      ])
      .optional(), // Makes home_address optional
    game_days: z
      .array(z.number().int().min(1).max(7)) // Expecting an array of numbers between 1 and 7
      .optional(),
  }),
];
