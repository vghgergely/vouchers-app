import { useEffect, useState } from 'react';
import UserPicker from './components/UserPicker';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import VoucherRedemptionPage from './pages/VoucherRedemptionPage';
import { getAllVouchers } from './api/vouchersApi';
import { setVouchers } from './states/voucherSlice';
import VoucherManagementPage from './pages/VoucherManagementPage';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllVouchers().then((response) => {
        dispatch(setVouchers(response.data));
        setError(null);
    }).catch(() => {
        setError('Error loading vouchers, please try again later.');
    })
  }, [dispatch])

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
      {error && <ErrorDisplay message={error}/>}
      {!error && (
        <>
        <UserPicker className="fixed top-10 right-10" onError={setError}/>
        {selectedUser && (
          <>
            <h1 className="text-center text-3xl font-bold mb-4">{getTitle()}</h1>
            <Routes>
              <Route path="/vouchers" element={<VoucherRedemptionPage />} />
              <Route path="/management" element={<VoucherManagementPage />} />
            </Routes>
          </>
        )}
        </>
    )}
    </div>
  );
}

export default App;
