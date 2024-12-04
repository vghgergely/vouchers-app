import { useEffect } from 'react';
import './App.css';
import UserPicker from './components/UserPicker';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import VoucherRedemptionPage from './pages/VoucherRedemptionPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const selectedVouchers = useSelector((state: RootState) => state.voucherSelection.selectedVouchers);

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

  const getTitle = () => {
    if (location.pathname === '/vouchers') {
      return 'Redeem Vouchers';
    } else if (location.pathname === '/management') {
      return 'Manage Vouchers';
    }
    return '';
  };

  return (
    <div className="App dark p-10">
      <UserPicker className="fixed top-10 right-10"/>
      {selectedUser && (
        <>
          <h1 className="text-center text-3xl font-bold mb-4">{getTitle()}</h1>
          <Routes>
            <Route path="/vouchers" element={<VoucherRedemptionPage />} />
            <Route path="/management" element={<div>Pepega</div>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
