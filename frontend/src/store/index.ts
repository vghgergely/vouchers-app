import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import voucherSelectionReducer from './voucherSelectionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    voucherSelection: voucherSelectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;