
import MockAdapter from 'axios-mock-adapter';
import api, { getUsers } from './usersApi';
import { User } from '../types';

describe('usersApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  test('getUsers', async () => {
    const response: User[] = [
      { id: 1, name: 'John Doe', role: 'OPERATOR' },
      { id: 2, name: 'Jane Smith', role: 'CLIENT' }
    ];

    mock.onGet('/').reply(200, response);

    const result = await getUsers();
    expect(result.data).toEqual(response);
  });
});