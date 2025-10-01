import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  theme: 'light', // Added theme state
};

const appSlice = createSlice({
  name: 'app',
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
    toggleTheme: (state) => { // Added toggleTheme reducer
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setUser, setLoading, setError, clearError, logout, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
