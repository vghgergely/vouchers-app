import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  
});

export const getUsers = () => api.get('');

export default api;