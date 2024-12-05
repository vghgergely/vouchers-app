import voucherSelectionReducer, { toggleSelectVoucher, setRedemptionCount } from './voucherSelectionSlice';

interface VoucherSelectionState {
    selectedVouchers: { [voucherId: number]: number };
}

const initialState: VoucherSelectionState = {
    selectedVouchers: {},
};

describe('voucherSelectionSlice', () => {
    test('should return the initial state', () => {
        expect(voucherSelectionReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle toggleSelectVoucher', () => {
        const voucherId = 1;

  
        let state = voucherSelectionReducer(initialState, toggleSelectVoucher(voucherId));
        expect(state.selectedVouchers).toEqual({ [voucherId]: 1 });

        state = voucherSelectionReducer(state, toggleSelectVoucher(voucherId));
        expect(state.selectedVouchers).toEqual({});
    });

    test('should handle setRedemptionCount', () => {
        const voucherId = 1;
        const count = 5;

        const state = voucherSelectionReducer(initialState, setRedemptionCount({ voucherId, count }));
        expect(state.selectedVouchers).toEqual({ [voucherId]: count });
    });
});