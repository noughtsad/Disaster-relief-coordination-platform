import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import requestReducer from './requestSlice';
import donationReducer from './donationSlice';
import communicationReducer from './communicationSlice';
import ngoReducer from './ngoSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    requests: requestReducer,
    donations: donationReducer,
    communications: communicationReducer,
    ngo: ngoReducer,
  },
});

export default store;
