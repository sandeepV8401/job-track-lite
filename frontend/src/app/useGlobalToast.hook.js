 
import { useDispatch, useSelector } from "react-redux";
import {
  setGlobalError,
  setGlobalSuccess,
  clearGlobalError,
  clearGlobalSuccess,
} from "./uiSlice";  

export const useGlobalToast = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  const success = useSelector((state) => state.ui.success);

  // const showError = (errorData) => dispatch(setGlobalError(errorData));
  const showError = (errorData) => {
  const message =
    typeof errorData === "string"
      ? errorData
      : errorData?.message || "Something went wrong";

  dispatch(setGlobalError({ message }));
};
  const showSuccess = (message) => dispatch(setGlobalSuccess({ message }));
  const clearError = () => dispatch(clearGlobalError());
  const clearSuccess = () => dispatch(clearGlobalSuccess());

  return { error, success, showError, showSuccess, clearError, clearSuccess };
};
