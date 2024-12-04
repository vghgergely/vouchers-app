import { combineReducers, configureStore } from '@reduxjs/toolkit';
import voucherSelectionReducer from '../states/voucherSelectionSlice';
import voucherSliceReducer from '../states/voucherSlice';
import userReducer from '../states/userSlice';


const rootReducer = combineReducers({
  user: userReducer,
  voucherSelection: voucherSelectionReducer,
  vouchers: voucherSliceReducer
});

const store = configureStore({
  reducer: rootReducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export default store;