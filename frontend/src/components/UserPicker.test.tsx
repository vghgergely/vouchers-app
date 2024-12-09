import { render, screen, waitFor } from '../utils/test-utils';
import UserPicker from './UserPicker';
import userEvent from "@testing-library/user-event";
import { RootState, setupStore } from '../store';
import { getUsers } from '../api/usersApi';

jest.mock('../api/usersApi', () => ({
    getUsers: jest.fn()
  }));

const initialState: Partial<RootState> = {
    user: {selectedUser: null},
    vouchers: { vouchers: [] }
};

describe('UserPicker', () => {
  let store: any;

  beforeEach(() => {
    store = setupStore(initialState);
  });

  test('dispatches setUser with the correct user on change', async () => {
    const user = userEvent.setup();
    (getUsers as jest.Mock).mockResolvedValue({ data: [{ id: 1, name: 'testOperator', role: 'OPERATOR' }, { id: 2, name: 'testClient', role: 'CLIENT' }]})
    render(
        <UserPicker className='' onError={() => {}}/>, { store }
    );

    await waitFor(() => { expect(store.getState().user.selectedUser).toEqual({ id: 1, name: 'testOperator', role: 'OPERATOR' }) });
    const selectElement = screen.getByTestId('user-picker-select');
    await user.selectOptions(selectElement, '2');

    await waitFor(() => {
        expect(store.getState().user.selectedUser).toEqual({ id: 2, name: 'testClient', role: 'CLIENT' })
    });
  });
});