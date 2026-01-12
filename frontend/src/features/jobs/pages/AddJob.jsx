import JobForm from "../components/JobForm";
import { useJob } from "../store/jobHook";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalToast } from "../../../app/useGlobalToast.hook";

const AddJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSearch = location.search;
  const { addJob, isLoading } = useJob();
  const { showError, showSuccess } = useGlobalToast();

  //  const handleSubmit = (payload) => {
  //    ("PAY",payload)
  //    addJob(payload);
  //  };

  const handleSubmit = async (payload) => {
    try {
      const res = await addJob(payload).unwrap();

      showSuccess(res.message);
      setTimeout(() => navigate("/jobs"), 400);
    } catch (error) {
      showError(error);
    }
  };

  const handleCancel = () => {
    navigate(`/jobs${currentSearch}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent text-center">
          Add Job
        </h1>
        <JobForm
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
          submitLabel="Add Job"
          onCancel={handleCancel}
          initialData={{}}
        />
      </div>
    </div>
  );
};
export default AddJob;
