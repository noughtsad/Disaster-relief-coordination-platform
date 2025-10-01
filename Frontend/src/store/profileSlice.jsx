import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: 'Emily Carter',
    phone: '+1 (555) 123-4567',
    email: 'emily.carter@email.com',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'John Carter - +1 (555) 987-6543',
    medicalInfo: 'No known allergies'
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
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

export const { setProfile, setLoading, setError, clearError } = profileSlice.actions;

export default profileSlice.reducer;
