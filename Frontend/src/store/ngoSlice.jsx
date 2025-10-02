import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setNgoProfile, setLoading, setError, clearError } = ngoSlice.actions;

export default ngoSlice.reducer;
