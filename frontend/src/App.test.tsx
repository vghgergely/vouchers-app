import { render, waitFor, screen} from './utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getAllVouchers } from './api/vouchersApi';
import { RootState, setupStore } from './store';
import { getUsers } from './api/usersApi';
import { EnhancedStore } from '@reduxjs/toolkit';

jest.mock('./api/vouchersApi', () => ({
  getAllVouchers: jest.fn(),
}));

jest.mock('./api/usersApi', () => ({
  getUsers: jest.fn()
}));

const initialState: Partial<RootState> = {
  user: { selectedUser: { role: 'CLIENT', id: 2, name: 'testClient'} },
  vouchers: { vouchers: [] }
};

describe('App', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = setupStore(initialState);
  });

  test('renders App and handles API success', async () => {
    const mockResponse = { data: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10 }] };
    (getUsers as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, name: 'testClient', role: 'CLIENT' }] });
    (getAllVouchers as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Redeem Vouchers')).toBeInTheDocument();
    });
  });

  test('renders App and handles API error', async () => {
    (getAllVouchers as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    (getUsers as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading vouchers, please try again later.')).toBeInTheDocument();
    });
  });

  test('navigates based on user role', async () => {
    const mockResponse = { data: [{ code: 'TESTCODE', expiryDate: '2025-12-31', maxRedemptionCount: 10 }] };
    (getAllVouchers as jest.Mock).mockResolvedValue(mockResponse);
    (getUsers as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, name: 'testClient', role: 'CLIENT' }] });

    render(
        <BrowserRouter>
          <App />
        </BrowserRouter>, { store}
    );

    await waitFor(() => {
      expect(screen.getByText('Redeem Vouchers')).toBeInTheDocument();
    });

    (getUsers as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, name: 'testClient', role: 'OPERATOR' }] });

    store = setupStore({
      user: { selectedUser: { role: 'OPERATOR', id: 1, name: 'testOperator' } },
      vouchers: { vouchers: [] }
    });

    render(

        <BrowserRouter>
          <App />
        </BrowserRouter>, { store}
    );

    await waitFor(() => {
      expect(screen.getByText('Manage Vouchers')).toBeInTheDocument();
    });
  });
});