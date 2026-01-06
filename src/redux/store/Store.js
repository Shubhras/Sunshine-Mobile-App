import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE,
  PERSIST,
  PURGE,
  REGISTER, REHYDRATE, persistReducer, persistStore
} from 'redux-persist';
import disputeResonsSlice from '../slices/DisputeResonsSlice';
import locationSlice from '../slices/LocationSlice';
import usersSlices from '../slices/SessionUser';
import datingSlices from '../slices/datingSlice';
import userReportsSlices from '../slices/userReportsSlice';
import inAppPurchaseSlice from '../slices/inAppPurchaseSlice';
import chatSlice from '../slices/chatSlice';
import reduxStorage from './storage';

const rootReducer = combineReducers({
  users: usersSlices,
  locations: locationSlice,
  disputeResons: disputeResonsSlice,
  dating: datingSlices,
  userReports: userReportsSlices,
  inAppPurchase: inAppPurchaseSlice,
  chat: chatSlice,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST],
      }}),
  // Add other middleware or enhancers if needed
});

export const persistor = persistStore(store);

export default store;

