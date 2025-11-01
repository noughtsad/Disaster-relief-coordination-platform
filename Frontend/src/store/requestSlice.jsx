import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  requests: [], // Will be populated dynamically from backend API
  pendingRequests: [],
  acceptedRequests: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all pending requests
export const fetchPendingRequests = createAsyncThunk(
  'requests/fetchPendingRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/request/all?status=Pending`,
        { withCredentials: true }
      );
      return response.data.requests.map(req => ({ ...req, id: req._id }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for fetching requests accepted by the current NGO
export const fetchAcceptedRequests = createAsyncThunk(
  'requests/fetchAcceptedRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/request/my-accepted-requests`,
        { withCredentials: true }
      );
      return response.data.requests.map(req => ({ ...req, id: req._id }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for accepting a request
export const acceptRequestAsync = createAsyncThunk(
  'requests/acceptRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/request/accept/${requestId}`,
        {},
        { withCredentials: true }
      );
      return { ...response.data.request, id: response.data.request._id };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload;
      })
      .addCase(fetchPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAcceptedRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcceptedRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptedRequests = action.payload;
      })
      .addCase(fetchAcceptedRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Remove accepted request from pending requests
        state.pendingRequests = state.pendingRequests.filter(
          (request) => request._id !== action.payload._id
        );
        // Add accepted request to accepted requests
        state.acceptedRequests.push(action.payload);
      })
      .addCase(acceptRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addRequest, updateRequestStatus, setRequests, setLoading, setError, clearError } = requestSlice.actions;

export default requestSlice.reducer;
