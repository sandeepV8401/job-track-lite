 
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

const EMPTY_VALUES = {
  title: "",
  companyName: "",
  salary: "",
  location: "",
  jobType: "",
  employmentMode: "",
  skills: "",
  description: "",
  isRemote: false,
  status: "applied",
};

const JobForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Add Job",
  
  className = "",
}) => {
   
  "initialData DATA", initialData;
  const safeInitialData =
    initialData && initialData._id
      ? {
          title: initialData.title || "",
          companyName: initialData.companyName || "",
          salary: initialData.salaryValue || "",
          location: initialData.location || "",
          jobType: initialData.jobType || "",
          employmentMode: initialData.employmentMode || "",
          skills: initialData.skills?.join(", ") || "",
          description: initialData.description || "",
          isRemote: initialData.isRemote || false,
          status: initialData.status || "applied",
        }
      : EMPTY_VALUES;
  "SAFEINITIAL DATA", safeInitialData;
  const methods = useForm({ defaultValues: EMPTY_VALUES });
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty: formIsDirty },
  } = methods;

   
  useEffect(() => {
    if (initialData && initialData._id && Object.keys(initialData).length > 1) {
      reset(safeInitialData);
    }
  }, [initialData?._id, reset]);

  const onFormSubmit = (data) => {
    const payload = {
      ...data,
      jobType: data.jobType || "Full-time", 
      employmentMode: data.employmentMode || "Onsite", 
      salary: Number(data.salary),
      salaryValue: Number(data.salary),
      skills: data.skills
        ? data.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };
    onSubmit(payload);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md ${className}`}
      >
        {/* ALL YOUR FORM FIELDS - SAME */}
        <div className="col-span-1 sm:col-span-2">
          <input
            placeholder="Job Title *"
            {...methods.register("title", {
              required: "Job title is required",
            })}
            className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 border text-sm ${
              errors.title ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <input
            placeholder="Company Name *"
            {...methods.register("companyName", {
              required: "Company name is required",
            })}
            className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 border text-sm ${
              errors.companyName
                ? "border-red-400 bg-red-50"
                : "border-gray-200"
            }`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* 🔥 SALARY - SEPARATE FULL WIDTH */}
        <div className="col-span-1 sm:col-span-2">
          <input
            type="number"
            step="0.1"
            placeholder="Salary (LPA)"
            {...methods.register("salary", {
              required: "Salary is required",
              min: 0,
            })}
            className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 border text-sm ${
              errors.salary ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.salary && (
            <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>
          )}
        </div>

        {/* 🔥 LOCATION - SEPARATE FULL WIDTH */}
        <div className="col-span-1 sm:col-span-2">
          <input
            placeholder="Location *"
            {...methods.register("location", {
              required: "Location is required",
            })}
            className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 border text-sm ${
              errors.location ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <select
          {...methods.register("jobType")}
          className="p-3 sm:p-2 rounded-lg bg-gray-100 border border-gray-200 text-sm"
        >
          <option value="">Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
        </select>

        <select
          {...methods.register("employmentMode")}
          className="p-3 sm:p-2 rounded-lg bg-gray-100 border border-gray-200 text-sm"
        >
          <option value="">Employment Mode</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>

        <div className="col-span-1 sm:col-span-2">
          <input
            placeholder="Skills (React, Node, MongoDB)"
            {...methods.register("skills")}
            className="w-full p-3 sm:p-2 rounded-lg bg-gray-100 border border-gray-200 text-sm"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <textarea
            rows="3"
            placeholder="Description"
            {...methods.register("description")}
            className="w-full p-3 sm:p-2 rounded-lg bg-gray-100 border border-gray-200 text-sm"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <select
            {...methods.register("status")}
            className="w-full p-3 sm:p-2 rounded-lg bg-gray-100 border border-gray-200 text-sm"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 flex gap-3 justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting || (initialData?._id && !formIsDirty)}  Safe optional chaining
            className={`px-8 py-2 rounded-lg text-white font-semibold ${
              isSubmitting || (initialData?._id && !formIsDirty)
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
