 
const { z } = require("zod");

 
const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

 
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const updateProfileSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    phone: z
      .string({ required_error: "Phone no is required" })
      .trim()
      .regex(/^[0-9]{10}$/, "Enter valid 10 digit phone"),

    skills: z.string().max(500, "Skills too long").optional(),
    address: z
      .string()
      .min(10, "Address must be at least 10 characters")
      .optional()
      .or(z.literal("")),
  })
  .strip();

module.exports = {
  signupSchema,
  loginSchema,
  updateProfileSchema,
};
