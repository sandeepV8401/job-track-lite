import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useJob } from "../store/jobHook";
import { useGlobalToast } from "../../../app/useGlobalToast.hook";

import { useEffect } from "react";

const EditJob = () => {
  const { currentJob, updateJob, getJobById, clearCurrentJob, getJobs } =
    useJob();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useGlobalToast();

  useEffect(() => {
    if (id && !currentJob) getJobById(id);
  }, [id, currentJob, getJobById]);

  const handleUpdate = async (payload) => {
    try {
      "📤 Update Job:", id, payload;
      const res = await updateJob(id, payload).unwrap();
      "toast mess", res;
      getJobs();
      showSuccess(res.message);
      setTimeout(() => navigate(-1), 400);
    } catch (error) {
      console.error("❌ Backend Error:", error);
      showError(error);
    }
  };

  const handleCancel = () => {
    clearCurrentJob();
    navigate(-1);
  };

  useEffect(() => {
    return () => clearCurrentJob();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent text-center">
          Update Job
        </h1>
        <JobForm
          initialData={currentJob}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
          submitLabel="Update Job"
          isSubmitting={false}
        />
      </div>
    </div>
  );
};

export default EditJob;
