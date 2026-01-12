import { Listbox } from "@headlessui/react";
import { ChevronDownIcon, Search, RefreshCw } from "lucide-react";
import JobCard from "../components/JobCard";
import { useEffect, useMemo, useCallback } from "react";    
import { useJob } from "../store/jobHook"; 

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Applied", value: "applied" },
  { label: "Interview", value: "interview" },
  { label: "Offered", value: "offered" },
  { label: "Rejected", value: "rejected" },
];

const JobList = () => {
   
  const {
    jobs=[],
    filteredJobs,
    getJobs,
    filterJobs,
    filters: { status, location, minSalary, isSearchApplied }, 
    setJobFilters,
    resetAllJobFilters,
    isLoading,
    clearCurrentJob,
  } = useJob();

   
  const isSearchDisabled = !location.trim() && !minSalary.trim();

  useEffect(() => {
    getJobs();
  }, []);
   
  const handleStatusChange = useCallback(
    (status) => {
      setJobFilters({ status });
    },
    [setJobFilters]
  );

   
  const handleSearch = useCallback(() => {
    filterJobs({ location, minSalary }); 
    setJobFilters({ isSearchApplied: true }); 
  }, [location, minSalary, filterJobs, setJobFilters]);  

   
  const handleReset = useCallback(() => {
    resetAllJobFilters();
    getJobs();  
  }, [resetAllJobFilters, getJobs]); 

   

   
  const baseJobs = useMemo(() => {
     
    if (isSearchApplied) {
      const list = filteredJobs ?? [];
      return status !== "all"  
        ? list.filter((job) => job.status === status)
        : list;
    }

     
    if (status !== "all") {
       
      return jobs.filter((job) => job.status === status);
    }

     
    return jobs;
  }, [jobs, filteredJobs, status, isSearchApplied]); 

   
  useEffect(() => {
    return () => clearCurrentJob();
  }, [clearCurrentJob]);

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6">
      {/* FILTER BAR - EXACT SAME LAYOUT & STYLES */}
      <div className="w-full max-w-4xl flex items-center gap-3 flex-wrap">
        <Listbox value={status} onChange={handleStatusChange}>
          
          
          <div className="relative">
            <Listbox.Button className="bg-gray-100 px-4 py-2 rounded-lg w-40 flex justify-between items-center hover:bg-gray-200">
              <span className="text-sm font-medium">
                {STATUS_OPTIONS.find((o) => o.value === status)?.label}{" "}
                
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-40 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
              {STATUS_OPTIONS.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setJobFilters({ location: e.target.value })}  
          className="bg-gray-100 px-4 py-2 rounded-lg flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          min="0"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setJobFilters({ minSalary: e.target.value })} 
          className="bg-gray-100 px-4 py-2 rounded-lg w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`p-2 rounded-lg transition-all ${
            isSearchDisabled
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <RefreshCw className="w-5 h-5 hover:rotate-180 transition-transform" />
        </button>
      </div>

      {/* JOB LIST - EXACT SAME JSX & STYLES */}
      <div className="w-full max-w-4xl space-y-4">
        {isLoading ? (
          <div className="text-center py-20">Loading jobs...</div>
        ) : (baseJobs||[]).length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No {status === "all" ? "jobs" : `${status} jobs`} found{" "}
           
          </div>
        ) : (
          (baseJobs||[]).map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default JobList;
