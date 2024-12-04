export interface Voucher {
    id: number;
    code: string;
    expiryDate: string;
    redemptionCount: number;
    maxRedemptionCount: number;
    redeemable: boolean;
    expired: boolean;
}

export interface User {
  id: number;
  name: string;
  role: 'OPERATOR' | "CLIENT";
}

export interface BatchVoucherRedemptionRequest {
  voucherRedemptionRequests: VoucherRedemptionRequest[];
  userRole: 'OPERATOR' | 'CLIENT';
}

export interface VoucherRedemptionRequest {
  voucherCode: string;
  amount: number;
}