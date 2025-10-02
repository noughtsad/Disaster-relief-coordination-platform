import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    phone: "",
    email: "",
    userType: ""
  },
  isAuthenticated: false,
  loading: false,
  error: null,
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  logout,
  toggleTheme,
  updateProfile,
  setIsAuthenticated
} = appSlice.actions;

export default appSlice.reducer;
