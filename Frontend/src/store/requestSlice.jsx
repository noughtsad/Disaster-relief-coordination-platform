import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [], // Will be populated dynamically from backend API
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
    acceptRequest: (state, action) => {
      const { id, acceptedBy } = action.payload;
      const existingRequest = state.requests.find(request => request.id === id);
      if (existingRequest) {
        existingRequest.status = 'Approved';
        existingRequest.acceptedBy = acceptedBy;
        existingRequest.chatEnabled = true;
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

export const { addRequest, updateRequestStatus, acceptRequest, setRequests, setLoading, setError, clearError } = requestSlice.actions;

export default requestSlice.reducer;
