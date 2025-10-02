import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
  'app/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/me", {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
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
