import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getJobs,
  deleteJob,
  updateJob,
  addJob,
  getJobById,
  filterJobs,
} from "./jobService";

export const addJobThunk = createAsyncThunk(
  "job/addJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await addJob(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Adding job failed");
    }
  }
);

export const getJobsThunk = createAsyncThunk(
  "/job/getJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getJobs();
      "GET JOB THUNK", response.data;
      return response.data.jobs;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching jobs failed");
    }
  }
);

export const getJobByIdThunk = createAsyncThunk(
  "/job/getJobById",
  async (jobId, { rejectWithValue }) => {
    "id at thunk", jobId;
    try {
      const response = await getJobById(jobId);
      "GET JOB BY ID THUNK", response.data;
      return response.data.job;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching job failed");
    }
  }
);

export const deleteJobThunk = createAsyncThunk(
  "/job/deleteJob",
  async (jobId, { rejectWithValue }) => {
    "id at delete thunk", jobId;
    try {
      const response = await deleteJob(jobId);
      "GET JOB BY ID THUNK", response.data;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Deleting job failed");
    }
  }
);

export const updateJobByIdThunk = createAsyncThunk(
  "/job/updateJobById",
  async ({ jobId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateJob(jobId, updatedData);
      "UPDATE JOB BY ID THUNK", response.data;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Updating job failed");
    }
  }
);

export const filterJobsThunk = createAsyncThunk(
  "/job/filterJobs",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await filterJobs(filter);
      return response.data.jobs;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Updating job failed");
    }
  }
);

const initialState = {
  jobs: [],
  isLoading: false,
  error: null,
  currentJob: null,
  filteredJobs: [],
  filters: {
    status: "all",
    location: "",
    minSalary: "",
    isSearchApplied: false,
  },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetJobState: (state) => {
      state.jobs = [];
      state.currentJob = null;
      state.error = null;
      state.isLoading = false;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    setJobFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetAllJobFilters: (state) => {
      state.filters = {
        status: "all",
        location: "",
        minSalary: "",
        isSearchApplied: false,
      };
      state.filteredJobs = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addJobThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJobThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload.job);
        state.error = null;
      })
      .addCase(addJobThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.payload || "Something went wrong";
      })

      .addCase(getJobsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getJobsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = Array.isArray(action.payload) ? action.payload : [];
        state.filteredJobs = [];
        state.error = null;
      })
      .addCase(getJobsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.payload || "Something went wrong";
      })
      .addCase(deleteJobThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        ("delete think, reducers");
        state.isLoading = false;

        const deletedId = action.payload.deletedJobId;

        state.jobs = state.jobs.filter((job) => job._id !== deletedId);

        state.filteredJobs = state.filteredJobs.filter(
          (job) => job._id !== deletedId
        );

        if (state.currentJob?._id === deletedId) {
          state.currentJob = null;
        }

        state.error = null;
      })
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.payload || "Something went wrong";
      })

      .addCase(getJobByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getJobByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentJob = action.payload;
        state.error = null;
      })
      .addCase(getJobByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.payload || "Something went wrong";
      })

      .addCase(updateJobByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateJobByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentJob = action.payload;
        const updatedJob = action.payload.updatedJob;
        state.jobs = state.jobs.map((job) =>
          job._id === updatedJob._id ? updatedJob : job
        );
        state.error = null;
      })
      .addCase(updateJobByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.payload || "Something went wrong";
      })

      .addCase(filterJobsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterJobsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredJobs = action.payload;
        state.error = null;
      })
      .addCase(filterJobsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.payload || "Something went wrong";
      });
  },
});

export const {
  clearError,
  resetJobState,
  clearCurrentJob,
  setJobFilters,
  resetAllJobFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
