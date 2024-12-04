import { useEffect, useState } from 'react';
import './App.css';
import UserPicker from './components/UserPicker';
import { getAllVouchers, redeemVouchers } from './api/vouchersApi';
import VoucherCard from './components/VoucherCard';
import VoucherGroup from './components/VoucherGroup';
import { Voucher } from './types';

function App() {

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [showExpired, setShowExpired] = useState<boolean>(false);
  const [showRedeemed, setShowRedeemed] = useState<boolean>(false);
  const [selectedVouchers, setSelectedVouchers] = useState<Set<number>>(new Set());

  useEffect(() => {
    getAllVouchers().then((vouchers) => {
      setVouchers(vouchers.data);
    })
  }, [])

  const redeemableVouchers = vouchers.filter((voucher) => voucher.redeemable && !voucher.expired);
  const expiredVouchers = vouchers.filter((voucher) => voucher.expired);
  const redeemedVouchers = vouchers.filter((voucher) => !voucher.redeemable && !voucher.expired);

  const toggleSelectVoucher = (id: number) => {
    setSelectedVouchers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const redeemSelectedVouchers = () => {
    const selectedVoucherCodes = Array.from(selectedVouchers).map(id => {
      const voucher = vouchers.find(v => v.id === id);
      return voucher ? voucher.code : '';
    }).filter(code => code !== '');
    redeemVouchers(selectedVoucherCodes);
  };

  return (
    <div className="App dark">
      <UserPicker />
      {selectedVouchers.size > 0 && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={redeemSelectedVouchers}
        >
          Redeem Selected Vouchers
        </button>
      )}
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
      <VoucherGroup vouchers={redeemableVouchers} type="redeemable" selectedVouchers={selectedVouchers}
        onSelectVoucher={toggleSelectVoucher}/>
      

      <div className={`transition-all duration-500 ${showExpired ? 'opacity-100' : 'opacity-0'}`}>
        {showExpired && (
          <>
            <h2>Expired Vouchers</h2>
            <VoucherGroup vouchers={expiredVouchers} type="expired" />
          </>
        )}
      </div>

      <div className={`transition-all duration-500 ${showRedeemed ? 'opacity-100' : 'opacity-0'}`}>
        {showRedeemed && (
          <>
            <h2>Redeemed Vouchers</h2>
            <VoucherGroup vouchers={redeemedVouchers} type="redeemed" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
