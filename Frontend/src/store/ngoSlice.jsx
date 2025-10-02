import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ngoProfile: {
    ngoName: "",
    ngoLocation: "",
    ngoContact: "",
    ngoDescription: "",
  },
  loading: false,
  error: null,
};

// Async thunk to fetch NGO profile data
export const fetchNgoProfile = createAsyncThunk(
  'ngo/fetchNgoProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/ngo/${userId}`, {
        withCredentials: true,
      });
      return response.data.ngo;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const ngoSlice = createSlice({
  name: "ngo",
  initialState,
  reducers: {
    setNgoProfile: (state, action) => {
      state.ngoProfile = { ...state.ngoProfile, ...action.payload };
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNgoProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNgoProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.ngoProfile = action.payload;
      })
      .addCase(fetchNgoProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.ngoProfile = initialState.ngoProfile; // Reset NGO profile on error
      });
  },
});

export const { setNgoProfile, setLoading, setError, clearError } = ngoSlice.actions;

export default ngoSlice.reducer;
