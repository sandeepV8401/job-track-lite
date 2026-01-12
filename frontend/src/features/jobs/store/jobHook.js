import { useSelector, useDispatch } from "react-redux";
import {
  addJobThunk,
  filterJobsThunk,
  getJobByIdThunk,
  getJobsThunk,
  updateJobByIdThunk,
  clearCurrentJob,
  setJobFilters,
  resetAllJobFilters,
  deleteJobThunk,
} from "./jobSlice"; 
import { useCallback } from "react";

 
export const useJob = () => {
   
  const jobState = useSelector((state) => state.job);

   
  const dispatch = useDispatch();

   
  const { jobs, currentJob, isLoading, error, filteredJobs, filters } =
    jobState;

  const getJobs = useCallback(() => dispatch(getJobsThunk()), [dispatch]);
  const getJobById = useCallback(
    (jobId) => dispatch(getJobByIdThunk(jobId)),
    [dispatch]
  );
  const deleteJob = useCallback(
    (jobId) => dispatch(deleteJobThunk(jobId)),
    [dispatch]
  );
  const addJob = useCallback(
    (formData) => dispatch(addJobThunk(formData)),
    [dispatch]
  );
  const updateJob = useCallback(
    (jobId, data) => dispatch(updateJobByIdThunk({ jobId, updatedData: data })),
    [dispatch]
  );
  const filterJobs = useCallback(
    (filter) => dispatch(filterJobsThunk(filter)),
    [dispatch]
  );
  const clearCurrentJobAction = useCallback(
    () => dispatch(clearCurrentJob()),
    [dispatch]
  );
  const setJobFiltersAction = useCallback(
    (payload) => dispatch(setJobFilters(payload)), 
    [dispatch]
  );
  const resetAllJobFiltersAction = useCallback(
    () => dispatch(resetAllJobFilters()),
    [dispatch]
  );

   
  return {
     
    jobs,
    currentJob,
    isLoading,
    error,
    filteredJobs,
    filters,

     
    addJob,
    getJobs,
    getJobById,
    updateJob,
    filterJobs,
    clearCurrentJob: clearCurrentJobAction,
    setJobFilters: setJobFiltersAction,
    resetAllJobFilters: resetAllJobFiltersAction,
    deleteJob,
  };
};
