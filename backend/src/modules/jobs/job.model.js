 
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be at most 100 characters"],
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [100, "Company name must be at most 100 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location must be at most 100 characters"],
    },

    jobType: {
      type: String,
      enum: {
        values: [
          "Full-time",
          "Part-time",
          "Contract",
          "Internship",
          "Freelance",
        ],
        message: "Invalid job type",
      },
    },

     
    salary: {
      type: String,
      required: [true, "Salary is required"],
      trim: true,
    },

     
    salaryValue: {
      type: Number,
      required: [true, "Salary value is required"],
      min: [0, "Salary must be greater than 0"],
      max: [50, "Salary too high"], 
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [100, "Description must be at most 100 characters"],
    },

    skills: {
      type: [String],
      set: (skills = []) => skills.map((s) => s.trim()),
    },

    isRemote: {
      type: Boolean,
      default: false,
    },

    employmentMode: {
      type: String,
      enum: {
        values: ["Onsite", "Hybrid", "Remote"],
        message: "Invalid employment mode",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["applied", "interview", "offered", "rejected"],
        message: "Invalid job status",
      },
      default: "applied",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    titleKey: { type: String, required: true, lowercase: true, trim: true },
    companyKey: { type: String, required: true, lowercase: true, trim: true },
    locationKey: { type: String, required: true, lowercase: true, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
