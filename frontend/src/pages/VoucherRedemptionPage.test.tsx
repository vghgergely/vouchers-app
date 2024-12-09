import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import VoucherRedemptionPage from './VoucherRedemptionPage';
import { RootState, setupStore } from '../store';
import { getAllVouchers, redeemVouchers } from '../api/vouchersApi';
import { setVouchers } from '../states/voucherSlice';
import { toggleSelectVoucher } from '../states/voucherSelectionSlice';
import { EnhancedStore } from '@reduxjs/toolkit';
import useDelayedState from '../hooks/useDelayedState';

jest.mock('../api/vouchersApi', () => ({
  redeemVouchers: jest.fn().mockResolvedValue({}),
  getAllVouchers: jest.fn()
}));

const mockResponse = { data: [{ id: 1, code: 'VOUCHER1', expiryDate: '2025-12-31', maxRedemptionCount: 10, redemptionCount: 1, redeemable: true, expired: false }] };

const initialState: Partial<RootState> = {
  user: { selectedUser: { id: 1, name: 'testClient', role: 'CLIENT' } },
  vouchers: { vouchers: [] },
  voucherSelection: { selectedVouchers: {} }
};

describe('VoucherRedemptionPage', () => {
  let store: EnhancedStore;
  
  beforeEach(() => {
    store = setupStore(initialState);
  });

  test('renders VoucherRedemptionPage and handles API success', async () => {
    store.dispatch(setVouchers(mockResponse.data));
    store.dispatch(toggleSelectVoucher(1));
    (redeemVouchers as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<VoucherRedemptionPage />, { store });

    fireEvent.click(screen.getByText('Redeem Selected Vouchers'));

    await waitFor(() => expect(redeemVouchers).toHaveBeenCalledTimes(1));
  });

  test('handles API error', async () => {
    const mockError = new Error('Failed to redeem vouchers');
    store.dispatch(setVouchers(mockResponse.data));
    store.dispatch(toggleSelectVoucher(1));
    (redeemVouchers as jest.Mock).mockRejectedValueOnce(mockError);

    render(<VoucherRedemptionPage />, { store });

    fireEvent.click(screen.getByText('Redeem Selected Vouchers'));

    await waitFor(() => expect(redeemVouchers).toHaveBeenCalledTimes(1));
  });

  test('toggles show expired vouchers checkbox', () => {
    render(<VoucherRedemptionPage />, { store });

    const checkbox = screen.getByLabelText('Show Expired Vouchers');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('toggles show redeemed vouchers checkbox', () => {
    render(<VoucherRedemptionPage />, { store });

    const checkbox = screen.getByLabelText('Show Redeemed Vouchers');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});