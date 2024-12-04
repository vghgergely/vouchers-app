import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../states/userSlice';
import voucherSelectionReducer from '../states/voucherSelectionSlice';

const rootReducer = combineReducers({
    user: userReducer,
    voucherSelection: voucherSelectionReducer
  })

const store = configureStore({
  reducer: rootReducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState
    })
  }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export default store;