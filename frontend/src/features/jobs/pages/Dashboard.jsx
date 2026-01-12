import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJob } from "../store/jobHook";
import { JOB_STATUS_CONFIG } from "../../../config/job.config";

const Dashboard = () => {
  const { jobs, getJobs, isLoading, setJobFilters, resetAllJobFilters } = useJob();  
  const navigate = useNavigate();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const getStatusCounts = (jobs=[]) => ({
    applied: jobs.filter((job) => job.status === "applied").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    offered: jobs.filter((job) => job.status === "offered").length,
    rejected: jobs.filter((job) => job.status === "rejected").length,
  });

  const stats = getStatusCounts(jobs??[]);

   
  const handleCardClick = (status) => {
    resetAllJobFilters();
     getJobs(); 
    setJobFilters({ status });  
    navigate(`/jobs?status=${status}`);  
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-64 items-center">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Click card to filter jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(stats).map(([status, count]) => {
            const config = JOB_STATUS_CONFIG[status];
            if (!config) return null;

            return (
              <div
                key={status}
                className={`group ${config.color} ${
                  config.textColor || "text-gray-900"
                } rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 cursor-pointer`}
                onClick={() => handleCardClick(status)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-white/80 flex items-center justify-center shadow-sm flex-shrink-0">
                    <img
                      src={config.logo}
                      alt={config.label}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold mb-1">{count}</div>
                    <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
                      {config.label}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 capitalize">
                      {status} jobs
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
