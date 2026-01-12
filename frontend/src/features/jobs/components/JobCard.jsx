// JobCard.jsx - ✅ NO CHANGES NEEDED (already perfect)
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useJob } from "../store/jobHook";
import { useGlobalToast } from "../../../app/useGlobalToast.hook";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { deleteJob, getJobs } = useJob();
  const { showError, showSuccess } = useGlobalToast();
  const getStatusConfig = (status) => {
    switch (status) {
      case "applied":
        return {
          bg: "bg-orange-50",
          text: "text-orange-700",
          dot: "bg-orange-400",
        };
      case "interview":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          dot: "bg-yellow-400",
        };
      case "offered":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          dot: "bg-emerald-400",
        };
      case "rejected":
        return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" };
    }
  };

  const statusConfig = getStatusConfig(job.status);
  // 🔥 HIGHLIGHT: Added getJobById BEFORE navigation (prefetches data)
  const handleEdit = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };
  // const handleDelete = (jobId) => {
  //   ("handle delete", jobId);
  //   deleteJob(jobId);
  // };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const result = await deleteJob(jobId).unwrap(); // 🔥 BE response मिलेगा
      showSuccess(result.message); // 🔥 "Job deleted successfully"
      getJobs(); // 🔥 Same filtered page refresh
    } catch (error) {
      showError(error.message || "Delete failed!");
    }
  };

  if (!job) return null;
  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 w-full max-w-4xl">
      <div className="flex items-center justify-between gap-4 h-full">
        {/* LEFT SIDE: Job Info */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* TOP ROW: Title */}
          <div className="font-semibold text-base text-gray-900 truncate group-hover:text-orange-600 transition-colors duration-200">
            {job.title}
          </div>

          {/* MIDDLE ROW: Company + Chips */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0 flex-wrap">
            {/* Company Name */}
            <div className="text-sm text-gray-500 min-w-0 flex-1 truncate max-w-48">
              {job.companyName}
            </div>

            {/* Location */}
            <div className="w-24 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium text-center truncate flex-shrink-0">
              {job.location}
            </div>

            {/* Salary */}
            <div className="w-20 font-semibold text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-center truncate flex-shrink-0">
              ₹{job.salaryValue} LPA
            </div>

            {/* Status */}
            <div
              className={`w-24 flex items-center gap-1 px-2 py-1 ${statusConfig.bg} ${statusConfig.text} rounded-full text-xs font-semibold truncate flex-shrink-0`}
            >
              <div
                className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse-slow shrink-0`}
              />
              {job.status}
            </div>
          </div>

          {/* BOTTOM ROW: Applied Date */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Applied 4 days ago</span>
          </div>
        </div>

        {/* RIGHT SIDE: Actions */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(job._id)}
              className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              title="Edit"
            >
              <Edit className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleDelete(job._id)}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
