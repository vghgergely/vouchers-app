export interface Voucher {
    id: number;
    code: string;
    expiryDate: string;
    redemptionCount: number;
    redeemable: boolean;
    expired: boolean;
  }