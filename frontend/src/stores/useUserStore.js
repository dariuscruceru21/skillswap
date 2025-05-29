import { create } from "zustand";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  checkingAuth: true,

  setUser: (user) => set({ user }),

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/api/auth/profile");
      set({ user: res.data, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/signin", { email, password });
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      set({ user: userData, loading: false });
      toast.success("Logged in!");
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Login failed" 
      });
      toast.error(error.response?.data?.message || "Invalid email or password");
      throw error;
    }
  },

  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/signup", userData);
      set({ user: response.data, loading: false });
      toast.success("Account created!");
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Signup failed" 
      });
      toast.error(error.response?.data?.message || "An error occurred");
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await api.post("/api/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logged out!");
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Logout failed" 
      });
      toast.error(error.response?.data?.message || "An error occurred during logout");
      throw error;
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await api.get("/api/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/refresh-token");
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Token refresh failed" 
      });
      throw error;
    }
  },

  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/auth/profile");
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to fetch profile" 
      });
      throw error;
    }
  },

  updateProfile: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/api/auth/users/${userData._id}`, userData);
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to update profile" 
      });
      throw error;
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return api(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return api(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);