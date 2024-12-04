import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '../types';

interface VoucherSelectionState {
    selectedVouchers: { [voucherId: number]: number };
    vouchers: Voucher[];
}

const initialState: VoucherSelectionState = {
    selectedVouchers: {},
    vouchers: [],
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
        setVouchers(state, action: PayloadAction<Voucher[]>) {
            state.vouchers = action.payload;
        },
    },
});

export const { toggleSelectVoucher, setRedemptionCount, setVouchers} = voucherSelectionSlice.actions;
export default voucherSelectionSlice.reducer;