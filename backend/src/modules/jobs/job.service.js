const Job = require("./job.model");
const normalize = (value = "") => String(value).trim().toLowerCase();
const addJobService = async (jobData) => {
  const titleKey = normalize(jobData.title);
  const companyKey = normalize(jobData.companyName);
  const locationKey = normalize(jobData.location || "");
  const existingJob = await Job.findOne({ titleKey, companyKey, locationKey });

  if (existingJob) {
    const error = new Error("Job already registered");
    error.statusCode = 409; 
    throw error;
  }
  
  const salaryNum = parseFloat(String(jobData.salary));
  if (!Number.isFinite(salaryNum) || salaryNum <= 0) {
    const error = new Error("Invalid salary number");
    error.statusCode = 400;
    throw error;
  }
  const salary = `${salaryNum} LPA`;
  const job = new Job({
    ...jobData,
    salary, 
    salaryValue: salaryNum,
    createdBy: jobData.createdBy,
    titleKey,
    companyKey,
    locationKey,
  });
  return await job.save();
};

const getJobsService = async (userId) => {
  
  const jobs = await Job.find({ createdBy: userId });

  if (!jobs) {
    const error = new Error("No Job Found");
    error.statusCode = 404; 
    throw error;
  }
  return jobs;
};

const deleteJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("No Job Found");
    error.statusCode = 404; 
    throw error;
  }

  await Job.findByIdAndDelete(jobId);
  const result = {
    message: "Job deleted successfully",
    deletedJobId: jobId,
  };
  return result;
};
const getJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId);
  
  if (!job) {
    const error = new Error("No Job Found");
    error.statusCode = 404; 
    throw error;
  }
  return job;
};
const updateJobByIDService = async (jobId, updates) => {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("No Job Found");
    error.statusCode = 404; 
    throw error;
  }
  if (updates.salary !== undefined) {
    const salaryNum = parseFloat(String(updates.salary));
    updates.salaryValue = salaryNum; 
    updates.salary = `${salaryNum} LPA`; 
  }
  const updatedJob = await Job.findByIdAndUpdate(
   jobId,
    { $set: updates },
    { new: true }
  );
  return updatedJob;
};

const filterJobsService = async (userId, filter) => {
  const filterJobs = await Job.find({ createdBy: userId, ...filter })
    .sort({ createdAt: -1 })
    .limit(50); 
  if (!filterJobs) {
    const error = new Error("No Job Found");
    error.statusCode = 404; 
    throw error;
  }
  return filterJobs;
};

module.exports = {
  addJobService,
  getJobsService,
  getJobByIdService,
  updateJobByIDService,
  filterJobsService,
  deleteJobByIdService,
};
