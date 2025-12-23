import { z } from "zod";

/**
 * SignupSchema
 * --------------------
 * Frontend → Backend signup payload ONLY
 * ❌ No roles selection
 * ❌ No credits
 * ❌ No admin/agent control
 */
export const SignupSchema = z.object({
  /* --------------------
     CORE AUTH
  -------------------- */

  // Appwrite userId (generated client-side)
  accountid: z.string().min(1, "Account ID required"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  /* --------------------
     BASIC PROFILE
  -------------------- */

  firstName: z.string().min(1, "First name required"),

  surname: z.string().min(1, "Surname required"),

  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Phone must be valid E.164 format e.g. +263771234567"
    )
    .optional(),

  country: z.string().min(1, "Country required"),

  location: z.string().optional(),

  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be YYYY-MM-DD")
    .optional(),

  /* --------------------
     OPTIONAL PROFILE
  -------------------- */

  bio: z.string().max(300, "Bio must be 300 characters or less").optional(),

  avatarUrl: z.string().url("Invalid avatar URL").optional(),

  /* --------------------
     SERVER-ENFORCED FIELDS
     (Hidden from UI)
  -------------------- */

  // 🔒 LOCKED: user only
  roles: z.array(z.literal("user")).length(1).default(["user"]),

  // 🔒 LOCKED: admin approval flow
  status: z.literal("Pending").default("Pending"),
});

export type SignupFormData = z.infer<typeof SignupSchema>;
