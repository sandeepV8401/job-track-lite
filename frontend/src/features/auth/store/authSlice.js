  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import { signup, login, getProfile, updateProfile } from "./authService";

  
  export const registerUserThunk = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await signup(userData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Registration failed");
      }
    }
  );

  
  export const loginUserThunk = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await login(credentials);
        "LOGIN RES", response.data;
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Invalid credentials");
      }
    }
  );

  
  export const getProfileThunk = createAsyncThunk(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getProfile();
        "LOGIN RES", response.data;
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Invalid credentials");
      }
    }
  );

  
  export const updateProfileThunk = createAsyncThunk(
    "auth/updateProfile",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await updateProfile(userData);
        "LOGIN RES", response.data;
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Invalid credentials");
      }
    }
  );

  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("token");
      },
      clearError: (state) => {
        state.error = null; 
      },
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(registerUserThunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        
        .addCase(registerUserThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
        })
        
        .addCase(registerUserThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload?.message || action.payload || "Something went wrong";
          state.isAuthenticated = false;
        })

        
        .addCase(loginUserThunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        
        .addCase(loginUserThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
        })
        
        .addCase(loginUserThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload?.message || action.payload || "Something went wrong";
          state.isAuthenticated = false;
        })

        
        .addCase(getProfileThunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        
        .addCase(getProfileThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.error = null;
        })
        
        .addCase(getProfileThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload?.message || action.payload || "Something went wrong";
        })

        
        .addCase(updateProfileThunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        
        .addCase(updateProfileThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = { ...state.user, ...action.payload.user };
          state.error = null;
        })
        
        .addCase(updateProfileThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload?.message || action.payload || "Something went wrong";
        });
    },
  });

  export const { logout, clearError } = authSlice.actions;
  export default authSlice.reducer;
