 
export const JOB_STATUS_CONFIG = {
  applied: {
    label: "Applied",
    logo: "/assets/applied.png",
    color: "bg-gray-400",         
    textColor: "text-gray-900",    
    dotColor: "bg-gray-400",       
    bgColor: "bg-gray-50",         
  },
  interview: {
    label: "Interview",
    logo: "/assets/interview.png",
    color: "bg-orange-400",        
    textColor: "text-orange-900",
    dotColor: "bg-orange-400",
    bgColor: "bg-orange-50",
  },
  offered: {
    label: "Offer",
    logo: "/assets/offer.png",
    color: "bg-emerald-400",
    textColor: "text-emerald-900",
    dotColor: "bg-emerald-400",
    bgColor: "bg-emerald-50",
  },
  rejected: {
    label: "Rejected",
    logo: "/assets/rejected.png",
    color: "bg-red-400",
    textColor: "text-red-900",
    dotColor: "bg-red-400",
    bgColor: "bg-red-50",
  },
};

 
export const getJobStatusConfig = (status) => JOB_STATUS_CONFIG[status] || JOB_STATUS_CONFIG.applied;
export const getStatusCount = (jobs, status) => jobs.filter(job => job.status === status).length;
