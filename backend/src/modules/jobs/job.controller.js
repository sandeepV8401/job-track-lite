const { addJobSchema, updateJobSchema } = require("./job.schema");
const {
  addJobService,
  getJobsService,
  getJobByIdService,
  updateJobByIDService,
  filterJobsService,
  deleteJobByIdService,
} = require("./job.service");

const addJobHandler = async (req, res) => {
  const validatedData = addJobSchema.parse(req.body);
  ("ADD job payload");
  const payload = {
    ...validatedData,
    createdBy: req.user.id, 
  };

  const result = await addJobService(payload);
  res.status(201).json({
    success: true,
    message: "Job added successfully",
    job: {
      id: result._id,
      title: result.title || "",
      companyName: result.companyName || "",
      location: result.location || "",
      jobType: result.jobType || "",
      salary: result.salary || "",
      salaryValue: result.salaryValue || 0,
      description: result.description || "",
      skills: result.skills || [],
      isRemote: result.isRemote || false,
      employmentMode: result.employmentMode || "",
      status: result.status || "",
    },
  });
};
const getJobsHandler = async (req, res) => {
  const userId = req.user.id;

  const jobs = await getJobsService(userId);
   ("JOBS AT CONTROLLER", jobs);
  res.status(200).json({
    success: true,
    message: "Jobs fetched successfully",
    jobs,
  });
};
const getJobByIdHandler = async (req, res) => {
  const jobId = req.params.id;
  const job = await getJobByIdService(jobId);

  res.status(200).json({
    success: true,
    message: "Jobs fetched successfully",
    job,
  });
};
const deleteJobByIdHandler = async (req, res) => {
  const jobId = req.params.id;
  const result = await deleteJobByIdService(jobId);

  res.status(200).json({
    success: true,
    message: result.message,
    deletedJobId: result.deletedJobId,
  });
};
const updateJobByIdHandler = async (req, res) => {
  const jobId = req.params.id;
  const validatedData = updateJobSchema.parse(req.body);
  const updatedJob = await updateJobByIDService(jobId, validatedData);
  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    updatedJob,
  });
};
const filterJobsHandler = async (req, res) => {
  const userId = req.user.id;
  const location = req.query.location || "";
  const minSalary = req.query.minSalary || "";
  const filter = {};

  if (location && location !== "undefined" && location.trim()) {
    filter.location = {
      $regex: decodeURIComponent(location).replace(/\+/g, " ").trim(),
      $options: "i",
    };
  }

  if (minSalary && !isNaN(parseInt(minSalary))) {
    filter.salary = { $gte: parseInt(minSalary) };
  }
  const jobs = await filterJobsService(userId, filter);
  res.json({
    success: true,
    count: jobs.length,
    message: "Jobs fetched successfully",
    jobs: jobs,
  });
};
module.exports = {
  addJobHandler,
  getJobsHandler,
  getJobByIdHandler,
  updateJobByIdHandler,
  filterJobsHandler,
  deleteJobByIdHandler,
};
