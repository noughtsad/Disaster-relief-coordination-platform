import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import requestReducer from './requestSlice';
import donationReducer from './donationSlice';
import communicationReducer from './communicationSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    requests: requestReducer,
    donations: donationReducer,
    communications: communicationReducer,
  },
});

export default store;
