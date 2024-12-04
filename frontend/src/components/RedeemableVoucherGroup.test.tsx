
import RedeemableVoucherGroup from './RedeemableVoucherGroup';
import { Voucher } from '../types';
import VoucherGroup from './VoucherGroup';
import { render, screen } from '../utils/test-utils';

jest.mock('./VoucherGroup', () => (props: any) => (
  <div data-testid="voucher-group" {...props} />
));

describe('RedeemableVoucherGroup', () => {
  const vouchers: Voucher[] = [
    { id: 1, code: 'VOUCHER1', expiryDate: '2025-12-31', maxRedemptionCount: 10, redemptionCount: 0, redeemable: true, expired: false },
    { id: 2, code: 'VOUCHER2', expiryDate: '2025-12-31', maxRedemptionCount: 5, redemptionCount: 0, redeemable: true, expired: false }
  ];

  const selectedVouchers = {
    1: 1,
    2: 2
  };

  test('renders VoucherGroup with correct props', () => {
    render(<RedeemableVoucherGroup vouchers={vouchers} selectedVouchers={selectedVouchers} />);

    const voucherGroup = screen.getByTestId('voucher-group');
    expect(voucherGroup).toBeInTheDocument();
    expect(voucherGroup).toHaveAttribute('type', 'redeemable');
  });
});