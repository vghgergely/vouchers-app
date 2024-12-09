import VoucherManagementPage from '../pages/VoucherManagementPage';
import { createVouchers } from '../api/vouchersApi';
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

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('adds voucher to the list and creates vouchers', async () => {
        const mockReturnVoucher = {
            data: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10, redeemable: true, expired: false }]
        };
        (createVouchers as jest.Mock).mockResolvedValue(mockReturnVoucher)
        render(
            <VoucherManagementPage />, { store }
        );

        fireEvent.change(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText('Maximum Redemptions'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('Add Voucher'));

        expect(await screen.findByText('Create Vouchers')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Create Vouchers'))

        await waitFor(() => expect(createVouchers).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(createVouchers).toHaveBeenCalledWith({
            userRole: 'OPERATOR',
            voucherCreationRequests: [{
                code: 'TESTCODE',
                expiryDate: '2025-12-31',
                maxRedemptionCount: "10"
            }]
        }));
        expect(store.getState().vouchers.vouchers).toEqual(mockReturnVoucher.data);
    });

    test('handles API error', async () => {
        const mockError = new Error('Failed to create vouchers');
        (createVouchers as jest.Mock).mockRejectedValueOnce(mockError);
        console.error = jest.fn();

        render(
            <VoucherManagementPage />
        );

        fireEvent.change(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText('Maximum Redemptions'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('Add Voucher'));

        expect(await screen.findByText('Create Vouchers')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Create Vouchers'))

        await waitFor(() => expect(createVouchers).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(createVouchers).toHaveBeenCalledWith({
            userRole: 'OPERATOR',
            voucherCreationRequests: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: "10" }]
        }))
    });

    test('removes voucher from the list', async () => {
        render(<VoucherManagementPage />, { store });
    
        fireEvent.change(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText('Maximum Redemptions'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('Add Voucher'));
    
        expect(await screen.findByText('Create Vouchers')).toBeInTheDocument();
    
        fireEvent.click(screen.getByText('Remove'));
    
        expect(screen.queryByText('Create Vouchers')).toBeNull();
      });
});