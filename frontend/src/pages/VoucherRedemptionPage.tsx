import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { getAllVouchers, redeemVouchers } from '../api/vouchersApi';

import { Voucher, BatchVoucherRedemptionRequest, VoucherRedemptionRequest } from '../types';
import ExpiredVoucherGroup from '../components/ExpiredVoucherGroup';
import RedeemableVoucherGroup from '../components/RedeemableVoucherGroup';
import RedeemedVoucherGroup from '../components/RedeemedVoucherGroup';
import { toggleSelectVoucher, setVouchers } from '../store/voucherSelectionSlice';

function VoucherRedemptionPage() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const selectedVouchers = useSelector((state: RootState) => state.voucherSelection.selectedVouchers);
  const [showExpired, setShowExpired] = useState<boolean>(false);
  const [showRedeemed, setShowRedeemed] = useState<boolean>(false);
  const vouchers = useSelector((state: RootState) => state.voucherSelection.vouchers);

  const redeemableVouchers = vouchers.filter((voucher: Voucher) => voucher.redeemable && !voucher.expired);
  const expiredVouchers = vouchers.filter((voucher: Voucher) => voucher.expired);
  const redeemedVouchers = vouchers.filter((voucher: Voucher) => !voucher.redeemable && !voucher.expired);

  useEffect(() => {
    getAllVouchers().then((response) => {
      dispatch(setVouchers(response.data));
    })
  }, [])

  const redeemSelectedVouchers = () => {
    const voucherRedemptionRequests = Object.keys(selectedVouchers).map(id => {
      const voucher = vouchers.find(v => v.id === parseInt(id));
      return voucher ? {
        voucherCode: voucher.code,
        amount: selectedVouchers[voucher.id]
      } : null;
    }).filter(v => v !== null) as VoucherRedemptionRequest[];

    const request: BatchVoucherRedemptionRequest = {
      voucherRedemptionRequests,
      userRole: selectedUser?.role || 'CLIENT'
    };

    redeemVouchers(request)
      .then(response => {
        const updatedVouchers = response.data as Voucher[];
        dispatch(setVouchers(vouchers.map(voucher => {
            const updatedVoucher = updatedVouchers.find(v => v.id === voucher.id);
            return updatedVoucher ? updatedVoucher : voucher;
          })));
        Object.keys(selectedVouchers).forEach(id => dispatch(toggleSelectVoucher(parseInt(id))));
      })
      .catch(error => {
        console.error('Error redeeming vouchers:', error);
      });
  };

  return (
    <>
      <div className="checkbox-group mt-4 flex space-x-4">
        <label className='flex items-center space-x-2'>
          <input
            type="checkbox"
            checked={showExpired}
            onChange={(e) => setShowExpired(e.target.checked)}
            className='form-checkbox h-4 w-4 text-blue-600'
          />
          <span>Show Expired Vouchers</span>
        </label>
        <label className='flex items-center space-x-2'>
          <input
            type="checkbox"
            checked={showRedeemed}
            onChange={(e) => setShowRedeemed(e.target.checked)}
            className='form-checkbox h-4 w-4 text-blue-600'
          />
          <span>Show Redeemed Vouchers</span>
        </label>
      </div>
      <h2 className='text-2l font-bold mt-8 mb-4'>Redeemable Vouchers</h2>
      <div className='relative'>
        <RedeemableVoucherGroup vouchers={redeemableVouchers} selectedVouchers={selectedVouchers} />

        {Object.keys(selectedVouchers).length > 0 && (
            <button
            className="absolute -top-5 right-0  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={redeemSelectedVouchers}
            >
            Redeem Selected Vouchers
            </button>
        )}
      </div>
      <div className={`transition-all duration-500 ${showExpired ? 'opacity-100' : 'opacity-0'}`}>
        {showExpired && (
          <>
            <h2 className='text-2l font-bold mt-8 mb-4'>Expired Vouchers</h2>
            <ExpiredVoucherGroup vouchers={expiredVouchers} />
          </>
        )}
      </div>

      <div className={`transition-all duration-500 ${showRedeemed ? 'opacity-100' : 'opacity-0'}`}>
        {showRedeemed && (
          <>
            <h2 className='text-2l font-bold mt-8 mb-4'>Redeemed Vouchers</h2>
            <RedeemedVoucherGroup vouchers={redeemedVouchers} />
          </>
        )}
      </div>
    </>
  );
};

export default VoucherRedemptionPage;