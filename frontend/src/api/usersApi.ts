import axios from 'axios';
import { User } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  
});

export const getUsers = () => api.get<User[]>('');

export default api;