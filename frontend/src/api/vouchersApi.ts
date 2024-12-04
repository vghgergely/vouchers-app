import axios from 'axios';
import { BatchVoucherRedemptionRequest, Voucher } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/vouchers',
});

export const createVouchers = (vouchers: Voucher[], userRole: string) => api.post<Voucher[]>('/create', { vouchers, userRole });
export const redeemVouchers = (request: BatchVoucherRedemptionRequest) => {
    return api.post<Voucher[]>('/redeem', { voucherRedemptionRequests: request.voucherRedemptionRequests, userRole: request.userRole });
  };
export const getAllVouchers = () => api.get<Voucher[]>('');

export default api;