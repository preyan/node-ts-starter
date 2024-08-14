import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),

  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email address is too short")
    .max(100, "Email address is too long")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),

  password: z
    .string()
    .min(8, "Password is too short")
    .max(100, "Password is too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),

  name: z.string().min(2, "Name is too short").max(100, "Name is too long"),

  username: z
    .string()
    .min(4, "Username is too short")
    .max(100, "Username is too long")
    .regex(/^[a-zA-Z0-9_]{4,}$/, "Username can only contain letters, numbers, and underscores"),

  avatar: z
    .string()
    .url("Invalid URL")
    .regex(/^(http|https):\/\/[^ "]+$/, "Invalid URL"),
};
