import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  communications: [
    {
      id: 1,
      type: "Email",
      recipient: "Donors Group",
      subject: "Monthly Impact Report",
      date: "2024-01-15",
      status: "Sent",
    },
    {
      id: 2,
      type: "SMS",
      recipient: "Volunteers",
      subject: "Upcoming Event Notification",
      date: "2024-01-14",
      status: "Scheduled",
    },
    {
      id: 3,
      type: "Newsletter",
      recipient: "All Subscribers",
      subject: "January Newsletter",
      date: "2024-01-12",
      status: "Draft",
    },
  ],
  loading: false,
  error: null,
};

const communicationSlice = createSlice({
  name: 'communications',
  initialState,
  reducers: {
    addCommunication: (state, action) => {
      state.communications.push(action.payload);
    },
    updateCommunicationStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingCommunication = state.communications.find(comm => comm.id === id);
      if (existingCommunication) {
        existingCommunication.status = status;
      }
    },
    setCommunications: (state, action) => {
      state.communications = action.payload;
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

export const { addCommunication, updateCommunicationStatus, setCommunications, setLoading, setError, clearError } = communicationSlice.actions;

export default communicationSlice.reducer;
