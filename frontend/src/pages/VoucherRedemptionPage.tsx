import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { redeemVouchers } from '../api/vouchersApi';

import { Voucher, BulkVoucherRedemptionRequest, VoucherRedemptionRequest } from '../types';
import ExpiredVoucherGroup from '../components/ExpiredVoucherGroup';
import RedeemableVoucherGroup from '../components/RedeemableVoucherGroup';
import RedeemedVoucherGroup from '../components/RedeemedVoucherGroup';
import { toggleSelectVoucher } from '../states/voucherSelectionSlice';
import { setVouchers } from '../states/voucherSlice';
import useDelayedState from '../hooks/useDelayedState';

function VoucherRedemptionPage() {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
    const selectedVouchers = useSelector((state: RootState) => state.voucherSelection.selectedVouchers);
    const [showExpired, setShowExpired] = useState<boolean>(false);
    const [showRedeemed, setShowRedeemed] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useDelayedState(false);
    const [showError, setShowError] = useDelayedState(false);
    const vouchers = useSelector((state: RootState) => state.vouchers.vouchers);

    const redeemableVouchers = vouchers.filter((voucher: Voucher) => voucher.redeemable && !voucher.expired);
    const expiredVouchers = vouchers.filter((voucher: Voucher) => voucher.expired);
    const redeemedVouchers = vouchers.filter((voucher: Voucher) => !voucher.redeemable && !voucher.expired);

    const redeemSelectedVouchers = () => {
        const voucherRedemptionRequests = Object.keys(selectedVouchers).map(id => {
            const voucher = vouchers.find(v => v.id === parseInt(id));
            return voucher ? {
                voucherCode: voucher.code,
                amount: selectedVouchers[voucher.id]
            } : null;
        }).filter(v => v !== null) as VoucherRedemptionRequest[];

        const request: BulkVoucherRedemptionRequest = {
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
                setShowSuccess(true);
                setShowError(false);
            })
            .catch(error => {
                setShowSuccess(false);
                setShowError(true);
            });
    };

    return (
        <>
            <div className={`z-50 fixed top-24 -translate-x-1/2 left-1/2 mt-4 p-4 w-auto bg-green-100 border border-green-400 text-green-700 rounded transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
                Voucher(s) redeemed successfully
            </div>

            <div className={`z-50 fixed top-24 -translate-x-1/2 left-1/2 transition-opacity duration-300 mt-4 p-4 w-auto border bg-red-100 border-red-400 text-red-800 rounded ${showError ? 'opacity-100' : 'opacity-0'}`}>
                Failed to redeem vouchers
            </div>
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
            <div className='relative'>
                {redeemableVouchers.length === 0 ? (
                    <div className='text-center text-2l font-bold mt-8'>
                        <span>You have no redeemable vouchers</span>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mt-8 mb-4">Redeemable Vouchers</h2>
                        <RedeemableVoucherGroup vouchers={redeemableVouchers} selectedVouchers={selectedVouchers} />
                    </>
                )}


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