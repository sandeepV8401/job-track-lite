import api from "../../../shared/services/api";

export const authService = {
  signup: (userData) => api.post("/auth/signup", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/me"),
  updateProfile: (userData) => api.patch("/auth/profile", userData),
};
export const signup = authService.signup;
export const login = authService.login;
export const getProfile = authService.getProfile;
export const updateProfile = authService.updateProfile;
