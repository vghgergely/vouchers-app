import VoucherManagementPage from '../pages/VoucherManagementPage';
import { act } from 'react';
import { createVouchers } from '../api/vouchersApi';
import { appendVouchers } from '../states/voucherSlice';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { setupStore } from '../store';
import { EnhancedStore } from '@reduxjs/toolkit';


jest.mock('../api/vouchersApi', () => ({
    createVouchers: jest.fn()
  }));

describe('VoucherManagementPage', () => {
    let store: EnhancedStore;
    beforeEach(() => {
        store = setupStore();
    });


    test('renders VoucherManagementPage', () => {
        render(
            <VoucherManagementPage />
        );

        expect(screen.getByText(/Voucher Code/i)).toBeInTheDocument();
    });

    test('adds voucher to the list and creates vouchers', async () => {
        const mockReturnVoucher = {
            data: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10, redeemable: true, expired: false }]
          };
        (createVouchers as jest.Mock).mockResolvedValue(mockReturnVoucher)
        render(
            <VoucherManagementPage />, {store}
        );

        fireEvent.change(screen.getByLabelText(/Voucher Code/i), { target: { value: 'TESTCODE' } });
        fireEvent.change(screen.getByLabelText(/Expiry Date/i), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText(/Maximum Redemptions/i), { target: { value: '10' } });
        fireEvent.click(screen.getByText(/Add Voucher/i));
        await waitFor(() => {
            expect(screen.getByText(/Vouchers to be Created/i)).toBeInTheDocument();
            expect(screen.getByText(/TESTCODE/i)).toBeInTheDocument();
            expect(screen.getByText(/Create Vouchers/i)).toBeInTheDocument();
        })
    
        await act(async () => {
            fireEvent.click(screen.getByText('Create Vouchers'));
        });
        
        expect(createVouchers).toHaveBeenCalledTimes(1);
        expect(createVouchers).toHaveBeenCalledWith({
            userRole: 'OPERATOR',
            voucherCreationRequests: [{
                code: 'TESTCODE',
                expiryDate: '2025-12-31',
                maxRedemptionCount: "10"
            }]
        });
        expect(store.getState().vouchers.vouchers).toEqual(mockReturnVoucher.data);
    });

    test('handles API error', async () => {
        const mockError = new Error('Failed to create vouchers');
        (createVouchers as jest.Mock).mockRejectedValueOnce(mockError);
        console.error = jest.fn();
    
        render(
            <VoucherManagementPage />
        );
    
        fireEvent.change(screen.getByLabelText(/Voucher Code/i), { target: { value: 'TESTCODE' } });
        fireEvent.change(screen.getByLabelText(/Expiry Date/i), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText(/Maximum Redemptions/i), { target: { value: '10' } });
        fireEvent.click(screen.getByText(/Add Voucher/i));
    
        await waitFor(() => {
          expect(screen.getByText(/Vouchers to be Created/i)).toBeInTheDocument();
          expect(screen.getByText(/TESTCODE/i)).toBeInTheDocument();
          expect(screen.getByText(/Create Vouchers/i)).toBeInTheDocument();
        });
    
        await act(async () => {
          fireEvent.click(screen.getByText('Create Vouchers'));
        });
    
        expect(createVouchers).toHaveBeenCalledTimes(1);
        expect(createVouchers).toHaveBeenCalledWith({
          userRole: 'OPERATOR',
          voucherCreationRequests: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: "10" }]
        });
    
        expect(console.error).toHaveBeenCalledWith('Error creating vouchers:', mockError);
      });
});