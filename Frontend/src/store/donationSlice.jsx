import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  donations: [
    {
      id: 1,
      donor: "John Smith",
      amount: 5000,
      type: "Money",
      date: "2024-01-15",
      campaign: "Flood Relief",
      status: "Received",
    },
    {
      id: 2,
      donor: "Sarah Johnson",
      amount: 2500,
      type: "Money",
      date: "2024-01-10",
      campaign: "Earthquake Recovery",
      status: "Pending",
    },
    {
      id: 3,
      donor: "Local Store",
      amount: 50,
      type: "Food Items",
      date: "2024-01-08",
      campaign: "Hurricane Assistance",
      status: "Received",
    },
  ],
  loading: false,
  error: null,
};

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    addDonation: (state, action) => {
      state.donations.push(action.payload);
    },
    updateDonationStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingDonation = state.donations.find(donation => donation.id === id);
      if (existingDonation) {
        existingDonation.status = status;
      }
    },
    setDonations: (state, action) => {
      state.donations = action.payload;
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

export const { addDonation, updateDonationStatus, setDonations, setLoading, setError, clearError } = donationSlice.actions;

export default donationSlice.reducer;
