import MockAdapter from 'axios-mock-adapter';
import api, { createVouchers, redeemVouchers, redeemVoucher, getAllVouchers } from './vouchersApi';
import { BulkVoucherCreationRequest, BulkVoucherRedemptionRequest, Voucher } from '../types';

describe('vouchersApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  test('createVouchers', async () => {
    const request: BulkVoucherCreationRequest = {
      userRole: 'OPERATOR',
      voucherCreationRequests: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10 }]
    };
    const response: Voucher[] = [{ id: 1, redemptionCount: 0, code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10, redeemable: true, expired: false }];

    mock.onPost('/create/bulk').reply(200, response);

    const result = await createVouchers(request);
    expect(result.data).toEqual(response);
  });

  test('redeemVouchers', async () => {
    const request: BulkVoucherRedemptionRequest = {
      userRole: 'OPERATOR',
      voucherRedemptionRequests: [{ voucherCode: 'TESTCODE', amount: 1 }]
    };
    const response: Voucher[] = [{ id: 1, redemptionCount: 0,  code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10, redeemable: true, expired: false }];

    mock.onPost('/redeem/bulk').reply(200, response);

    const result = await redeemVouchers(request);
    expect(result.data).toEqual(response);
  });

  test('redeemVoucher', async () => {
    const voucherCode = 'TESTCODE';
    const amount = 1;
    const userRole = 'OPERATOR';
    const response: Voucher = { id: 1, redemptionCount: 0,  code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10, redeemable: true, expired: false };

    mock.onPost('/redeem').reply(200, response);

    const result = await redeemVoucher(voucherCode, amount, userRole);
    expect(result.data).toEqual(response);
  });

  test('getAllVouchers', async () => {
    const response: Voucher[] = [{ id: 1, redemptionCount: 0,  code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10, redeemable: true, expired: false }];

    mock.onGet('/').reply(200, response);

    const result = await getAllVouchers();
    expect(result.data).toEqual(response);
  });
});