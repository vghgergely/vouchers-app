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

export interface BulkVoucherRedemptionRequest {
  voucherRedemptionRequests: VoucherRedemptionRequest[];
  userRole: 'OPERATOR' | 'CLIENT';
}

export interface SingleVoucherRedemptionRequest {
  voucherRedemptionRequest: VoucherRedemptionRequest;
  userRole: 'OPERATOR' | 'CLIENT';
}

export interface VoucherRedemptionRequest {
  voucherCode: string;
  amount: number;
}

export interface VoucherCreationRequest {
  code: string;
  maxRedemptionCount: number;
  expiryDate: string;
}

export interface SingleVoucherCreationRequest {
  userRole: string;
  voucherCreationRequest: VoucherCreationRequest;
}

export interface BulkVoucherCreationRequest {
  userRole: string;
  voucherCreationRequests: VoucherCreationRequest[];
}