const { z } = require("zod");

//  ================= ADD JOB =================
const addJobSchema = z
  .object({
    title: z
      .string({ required_error: "Job title is required" })
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters"),

    companyName: z
      .string({ required_error: "Company name is required" })
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must be at most 100 characters"),

    location: z
      .string()
      .max(100, "Location must be at most 100 characters")
      .optional()
      .or(z.literal("")),

    jobType: z
      .enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"])
      .optional(),

     
    salary: z
      .number({
        required_error: "Salary is required",
        invalid_type_error: "Salary must be a number",
      })
      .positive("Salary must be greater than 0")
      .max(50, "Salary too high"),  

    description: z
      .string()
      .max(100, "Description must be at most 100 characters")
      .optional()
      .or(z.literal("")),

    skills: z.array(z.string().min(1, "Skill cannot be empty")).optional(),

    isRemote: z.boolean().optional(),

    employmentMode: z.enum(["Onsite", "Hybrid", "Remote"]).optional(),

    status: z.enum(["applied", "interview", "offered", "rejected"]).optional(),
  })
  .strip();  

//  ================= UPDATE JOB =================
const updateJobSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters")
      .optional(),

    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must be at most 100 characters")
      .optional(),

    location: z
      .string()
      .max(100, "Location must be at most 100 characters")
      .optional()
      .or(z.literal("")),

    jobType: z
      .enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"])
      .optional(),

   
    salary: z
      .number({
        invalid_type_error: "Salary must be a number",
      })
      .positive("Salary must be greater than 0")
      .max(50, "Salary too high")
      .optional(),

    description: z
      .string()
      .max(100, "Description must be at most 100 characters")
      .optional()
      .or(z.literal("")),

    skills: z.array(z.string().min(1, "Skill cannot be empty")).optional(),

    isRemote: z.boolean().optional(),

    employmentMode: z.enum(["Onsite", "Hybrid", "Remote"]).optional(),

    status: z.enum(["applied", "interview", "offered", "rejected"]).optional(),
  })
  .strip(); 

module.exports = {
  addJobSchema,
  updateJobSchema,
};
