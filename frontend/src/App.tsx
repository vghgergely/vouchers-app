import { useEffect, useState } from 'react';
import './App.css';
import UserPicker from './components/UserPicker';
import { getAllVouchers, redeemVouchers } from './api/vouchersApi';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import VoucherGroup from './components/VoucherGroup';
import { BatchVoucherRedemptionRequest, Voucher, VoucherRedemptionRequest } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import ExpiredVoucherGroup from './components/ExpiredVoucherGroup';
import RedeemedVoucherGroup from './components/RedeemedVoucherGroup';
import RedeemableVoucherGroup from './components/RedeemableVoucherGroup';
import { toggleSelectVoucher } from './store/voucherSelectionSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const selectedVouchers = useSelector((state: RootState) => state.voucherSelection.selectedVouchers);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [showExpired, setShowExpired] = useState<boolean>(false);
  const [showRedeemed, setShowRedeemed] = useState<boolean>(false);

  useEffect(() => {
    getAllVouchers().then((response) => {
      console.log(response)
      setVouchers(response.data);
    })
  }, [])

  useEffect(() => {
    console.log(selectedVouchers)
  }, [selectedVouchers])

  useEffect(() => {
    if (selectedUser?.role === 'CLIENT') {
      navigate('/vouchers');
    } else {
      navigate('/management');
    }
  }, [selectedUser, navigate]);

  const redeemableVouchers = vouchers.filter((voucher) => voucher.redeemable && !voucher.expired);
  const expiredVouchers = vouchers.filter((voucher) => voucher.expired);
  const redeemedVouchers = vouchers.filter((voucher) => !voucher.redeemable && !voucher.expired);

  const redeemSelectedVouchers = () => {
    const voucherRedemptions = Object.keys(selectedVouchers).map(id => {
      const voucher = vouchers.find(v => v.id === parseInt(id));
      return voucher ? {
        voucherCode: voucher.code,
        amount: selectedVouchers[voucher.id]
      } : null;
    }).filter(v => v !== null) as VoucherRedemptionRequest[];
  
    const request: BatchVoucherRedemptionRequest = {
      voucherRedemptionRequests: voucherRedemptions,
      userRole: selectedUser?.role || 'CLIENT'
    };
    redeemVouchers(request)
      .then(response => {
        const updatedVouchers = response.data;
        setVouchers((prevVouchers) => {
          return prevVouchers.map((voucher) => {
            const updatedVoucher = updatedVouchers.find(v => v.id === voucher.id);
            return updatedVoucher ? updatedVoucher : voucher;
          });
        });
        Object.keys(selectedVouchers).forEach(id => dispatch(toggleSelectVoucher(parseInt(id))));
      })
      .catch(error => {
        console.error('Error redeeming vouchers:', error);
      });
  };

  return (
    <div className="App dark p-10">
      <UserPicker />
      {selectedUser && (
        <Routes>
          <Route path="/vouchers" element={
            <>
              
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={showExpired}
                    onChange={(e) => setShowExpired(e.target.checked)}
                  />
                  Show Expired Vouchers
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showRedeemed}
                    onChange={(e) => setShowRedeemed(e.target.checked)}
                  />
                  Show Redeemed Vouchers
                </label>
              </div>
              <h2>Redeemable Vouchers</h2>
              <RedeemableVoucherGroup vouchers={redeemableVouchers} selectedVouchers={selectedVouchers} />

              {Object.keys(selectedVouchers).length > 0 && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={redeemSelectedVouchers}
                >
                  Redeem Selected Vouchers
                </button>
              )}
              <div className={`transition-all duration-500 ${showExpired ? 'opacity-100' : 'opacity-0'}`}>
                {showExpired && (
                  <>
                    <h2>Expired Vouchers</h2>
                    <ExpiredVoucherGroup vouchers={expiredVouchers}/>
                  </>
                )}
              </div>

              <div className={`transition-all duration-500 ${showRedeemed ? 'opacity-100' : 'opacity-0'}`}>
                {showRedeemed && (
                  <>
                    <h2>Redeemed Vouchers</h2>
                    <RedeemedVoucherGroup vouchers={redeemedVouchers}/>
                  </>
                )}
              </div>
            </>
          }>

          </Route>
          <Route path="/management" element={<div>Pepega</div>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
