import { useSelector, useDispatch } from "react-redux";
import {
  registerUserThunk,
  loginUserThunk,
  logout,
  clearError,
  getProfileThunk,
  updateProfileThunk,
} from "./authSlice";  

 
export const useAuth = () => {
   
  const authState = useSelector((state) => state.auth);

   
  const dispatch = useDispatch();

   
  const { user, token, isAuthenticated, isLoading, error } = authState;

   
  const register = (formData) => dispatch(registerUserThunk(formData));
  const login = (formData) => dispatch(loginUserThunk(formData));
  const logoutAction = () => dispatch(logout());
  const clearErrorAction = () => dispatch(clearError());
  const getProfile = () => dispatch(getProfileThunk());
  const updateProfile = (data) => dispatch(updateProfileThunk(data));

   
  return {
     
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

     
    register,
    login,
    logout: logoutAction,
    clearError: clearErrorAction,
    getProfile,
    updateProfile,
  };
};
