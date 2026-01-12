import api from "../../../shared/services/api";
export const jobService = {
  getJobs: () => api.get("/jobs"),
  addJob: (jobData) => api.post("/jobs/add", jobData),
  getJobById: (id) => api.get(`/jobs/${id}`),
  updateJob: (id, jobData) => api.patch(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  filterJobs: (filter) => {
    const params = new URLSearchParams();
    if (filter.location) params.set("location", filter.location);
    if (filter.minSalary) params.set("minSalary", filter.minSalary);
    return api.get(`/jobs/filter?${params}`);
  },
};
export const getJobs = jobService.getJobs;
export const addJob = jobService.addJob;
export const getJobById = jobService.getJobById;
export const updateJob = jobService.updateJob;
export const deleteJob = jobService.deleteJob;
export const filterJobs = jobService.filterJobs;
