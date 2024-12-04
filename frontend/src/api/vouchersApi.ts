import axios from 'axios';
import { BulkVoucherCreationRequest, BulkVoucherRedemptionRequest, Voucher } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/vouchers',
});

export const createVouchers = (request: BulkVoucherCreationRequest) => api.post<Voucher[]>('/create/bulk', { voucherCreationRequests: request.voucherCreationRequests, userRole: request.userRole });
export const redeemVouchers = (request: BulkVoucherRedemptionRequest) => {
    return api.post<Voucher[]>('/redeem/bulk', { voucherRedemptionRequests: request.voucherRedemptionRequests, userRole: request.userRole });
  };
export const redeemVoucher = (voucherCode: string, amount: number, userRole: string) => {
    return api.post<Voucher>('/redeem', { voucherCode, amount, userRole });
};
export const getAllVouchers = () => api.get<Voucher[]>('');

export default api;