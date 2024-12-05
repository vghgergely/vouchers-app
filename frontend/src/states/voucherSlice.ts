import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '../types';

interface VoucherState {
    vouchers: Voucher[];
}

const initialState: VoucherState = {
    vouchers: [],
};

const voucherSlice = createSlice({
    name: 'vouchers',
    initialState: initialState,
    reducers: {
        setVouchers(state, action: PayloadAction<Voucher[]>) {
            state.vouchers = action.payload;
        },
        appendVouchers(state, action: PayloadAction<Voucher[]>) {
            console.log('Appending vouchers:', action.payload);
            console.log('Current vouchers:', state.vouchers);
            state.vouchers = [...state.vouchers, ...action.payload];
        },
    },
});

export const { setVouchers, appendVouchers} = voucherSlice.actions;
export default voucherSlice.reducer;