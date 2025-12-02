import { z } from "zod";

export const SignupSchema = z.object({
  accountId: z.string().min(1, "Account ID required"),
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name required"),
  surname: z.string().min(1, "Surname required"),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Phone must be valid E.164 format e.g. +263771234567"
    ),
  country: z.string().min(1, "Country required"),
  location: z.string().min(1, "Location required"),
  role: z.enum(["user", "agent"]).default("user"),
  status: z
    .enum(["Not Verified", "Pending", "Active", "Suspended"])
    .default("Pending"),
  nationalId: z.string().optional(),
  bio: z.string().max(300).optional(),
  metadata: z.array(z.string()).optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),

  // 🆕 Extra fields
  avatarUrl: z.string().url("Invalid URL").optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be YYYY-MM-DD")
    .optional(),
});

export type SignupFormData = z.infer<typeof SignupSchema>;
