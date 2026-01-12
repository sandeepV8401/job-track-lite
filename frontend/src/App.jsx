import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalToast } from "./app/useGlobalToast.hook";
import "./App.css";
import AppRoutes from "./app/AppRoutes";

function App() {
  const { error, success, clearError, clearSuccess } = useGlobalToast();

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
      clearError();
    }
    if (success?.message) {
      toast.success(success.message);
      clearSuccess();
    }
  }, [error, success, clearError, clearSuccess]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  );
}

export default App;
