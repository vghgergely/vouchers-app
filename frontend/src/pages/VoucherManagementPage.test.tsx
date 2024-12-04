import VoucherManagementPage from '../pages/VoucherManagementPage';
import { createVouchers } from '../api/vouchersApi';
import { appendVouchers } from '../states/voucherSelectionSlice';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';

jest.mock('../api/vouchersApi');
jest.mock('../states/voucherSelectionSlice');

describe('VoucherManagementPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <VoucherManagementPage />
        );
        expect(screen.getByText('Voucher Code')).toBeInTheDocument();
        expect(screen.getByText('Expiry Date')).toBeInTheDocument();
        expect(screen.getByText('Maximum Redemptions')).toBeInTheDocument();
        expect(screen.getByText('Add Voucher')).toBeInTheDocument();
    });

    it('shows validation errors when required fields are empty', async () => {
        render(

            <VoucherManagementPage />

        );
        fireEvent.click(screen.getByText('Add Voucher'));
        await waitFor(() => {
            expect(screen.getByText('Voucher code is required')).toBeInTheDocument();
            expect(screen.getByText('Expiry date is required')).toBeInTheDocument();
            expect(screen.getByText('Maximum redemptions is required')).toBeInTheDocument();
        });
    });

    it('shows a validation error when the expiry date is not in the future', async () => {
        render(

            <VoucherManagementPage />

        );
        fireEvent.input(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.input(screen.getByLabelText('Expiry Date'), { target: { value: '2020-01-01' } });
        fireEvent.input(screen.getByLabelText('Maximum Redemptions'), { target: { value: 5 } });
        fireEvent.click(screen.getByText('Add Voucher'));
        await waitFor(() => {
            expect(screen.getByText('Expiry date must be a future date')).toBeInTheDocument();
        });
    });

    it('shows a validation error when the maximum redemptions is less than 1', async () => {
        render(

            <VoucherManagementPage />

        );
        fireEvent.input(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.input(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.input(screen.getByLabelText('Maximum Redemptions'), { target: { value: 0 } });
        fireEvent.click(screen.getByText('Add Voucher'));
        await waitFor(() => {
            expect(screen.getByText('Maximum redemptions must be at least 1')).toBeInTheDocument();
        });
    });

    it('adds a new voucher to the vouchersToCreate state on form submission', async () => {
        render(

            <VoucherManagementPage />

        );
        fireEvent.input(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.input(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.input(screen.getByLabelText('Maximum Redemptions'), { target: { value: 5 } });
        fireEvent.click(screen.getByText('Add Voucher'));
        await waitFor(() => {
            expect(screen.getByText('Vouchers to be Created')).toBeInTheDocument();
            expect(screen.getByText('TESTCODE - Expires on 2025-12-31 - Max Redemptions: 5')).toBeInTheDocument();
        });
    });

    it('calls handleCreateVouchers and dispatches appendVouchers on successful creation', async () => {
        (createVouchers as jest.Mock).mockResolvedValue({ data: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 5 }] });
        render(

            <VoucherManagementPage />

        );
        fireEvent.input(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.input(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.input(screen.getByLabelText('Maximum Redemptions'), { target: { value: 5 } });
        fireEvent.click(screen.getByText('Add Voucher'));
        fireEvent.click(screen.getByText('Create Vouchers'));
        await waitFor(() => {
            expect(createVouchers).toHaveBeenCalledWith({
                userRole: 'OPERATOR',
                voucherCreationRequests: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 5 }]
            });
            expect(appendVouchers).toHaveBeenCalledWith([{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 5 }]);
        });
    });

    it('displays an error message when the createVouchers API call fails', async () => {
        (createVouchers as jest.Mock).mockRejectedValue(new Error('API error'));
        render(

            <VoucherManagementPage />

        );
        fireEvent.input(screen.getByLabelText('Voucher Code'), { target: { value: 'TESTCODE' } });
        fireEvent.input(screen.getByLabelText('Expiry Date'), { target: { value: '2025-12-31' } });
        fireEvent.input(screen.getByLabelText('Maximum Redemptions'), { target: { value: 5 } });
        fireEvent.click(screen.getByText('Add Voucher'));
        fireEvent.click(screen.getByText('Create Vouchers'));
        await waitFor(() => {
            expect(screen.getByText('Error creating vouchers. Please try again later.')).toBeInTheDocument();
        });
    });
});