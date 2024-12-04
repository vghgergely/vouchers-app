import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/vouchers',
});

export const createVouchers = () => api.post('/create');
export const redeemVouchers = (voucherCodes: string[]) => {
    return api.post('/redeem', { voucherCodes });
  };
export const getAllVouchers = () => api.get('');

export default api;