import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [
    { id: 1, type: 'Shelter', status: 'Pending', date: '01-01-2025', urgency: 'High', description: 'Need temporary shelter for family of 4' },
    { id: 2, type: 'Food', status: 'Approved', date: '01-01-2025', urgency: 'Medium', description: 'Food supplies for 1 week' },
    { id: 3, type: 'Medical Supplies', status: 'Completed', date: '01-01-2025', urgency: 'High', description: 'First aid kit and medications' }
  ],
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequestStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingRequest = state.requests.find(request => request.id === id);
      if (existingRequest) {
        existingRequest.status = status;
      }
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
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

export const { addRequest, updateRequestStatus, setRequests, setLoading, setError, clearError } = requestSlice.actions;

export default requestSlice.reducer;
