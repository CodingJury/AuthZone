import { z } from "zod";

export const registerBodySchema = z.object({
  email: z.string().email("Invalid 'email' address"),
  password: z.string().min(8, "Min 'password' length is 8"),
  firstName: z.string().min(1, "'firstName' is required"),
  lastName: z.string().min(1, "'lastName' is required")
});

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;