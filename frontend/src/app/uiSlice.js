 
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    error: null,
    success: null,
  },
  reducers: {
    setGlobalError: (state, action) => { 
      state.error = action.payload; 
    },
    setGlobalSuccess: (state, action) => { 
      state.success = action.payload; 
    },
    clearGlobalError: (state) => { 
      state.error = null; 
    },
    clearGlobalSuccess: (state) => { 
      state.success = null; 
    },
  },
});

export const { 
  setGlobalError, 
  setGlobalSuccess, 
  clearGlobalError, 
  clearGlobalSuccess 
} = uiSlice.actions;

export default uiSlice.reducer;
