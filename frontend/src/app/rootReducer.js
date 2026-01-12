import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import jobReducer from "../features/jobs/store/jobSlice";
import uiReducer from "./uiSlice";

const appReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  ui: uiReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;  
  }

  return appReducer(state, action);
};

export default rootReducer;
