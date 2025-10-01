import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import requestReducer from './requestSlice';
import profileReducer from './profileSlice';
import donationReducer from './donationSlice';
import communicationReducer from './communicationSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    requests: requestReducer,
    profile: profileReducer,
    donations: donationReducer,
    communications: communicationReducer,
  },
});

export default store;
