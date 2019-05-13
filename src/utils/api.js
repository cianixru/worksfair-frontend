import axios from 'axios';

require('dotenv').config({ path: '../../.env' });

export const baseURL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL,
});

export default api;
