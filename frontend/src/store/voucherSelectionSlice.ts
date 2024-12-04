import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VoucherSelectionState {
  selectedVouchers: { [voucherId: number]: number };
}

const initialState: VoucherSelectionState = {
  selectedVouchers: {},
};

const voucherSelectionSlice = createSlice({
  name: 'voucherSelection',
  initialState,
  reducers: {
    toggleSelectVoucher(state, action: PayloadAction<number>) {
      const voucherId = action.payload;
      if (state.selectedVouchers[voucherId]) {
        delete state.selectedVouchers[voucherId];
      } else {
        state.selectedVouchers[voucherId] = 1;
      }
    },
    setRedemptionCount(state, action: PayloadAction<{ voucherId: number; count: number }>) {
      const { voucherId, count } = action.payload;
      state.selectedVouchers[voucherId] = count;
    },
  },
});

export const { toggleSelectVoucher, setRedemptionCount } = voucherSelectionSlice.actions;
export default voucherSelectionSlice.reducer;