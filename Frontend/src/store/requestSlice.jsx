import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [
    { 
      id: 1, 
      type: 'Shelter', 
      status: 'Pending', 
      date: '01-01-2025', 
      urgency: 'High', 
      description: 'Need temporary shelter for family of 4',
      location: 'Downtown District',
      survivorId: 'survivor-1',
      acceptedBy: null,
      chatEnabled: false
    },
    { 
      id: 2, 
      type: 'Food', 
      status: 'Approved', 
      date: '01-01-2025', 
      urgency: 'Medium', 
      description: 'Food supplies for 1 week',
      location: 'North Area',
      survivorId: 'survivor-1',
      acceptedBy: 'ngo-1',
      chatEnabled: true
    },
    { 
      id: 3, 
      type: 'Medical Supplies', 
      status: 'Completed', 
      date: '01-01-2025', 
      urgency: 'High', 
      description: 'First aid kit and medications',
      location: 'East Zone',
      survivorId: 'survivor-1',
      acceptedBy: 'volunteer-1',
      chatEnabled: true
    }
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
