import axios from 'axios';

require('dotenv').config({ path: '../../.env' });

export const baseURL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL,
});

export const interceptorError = (payload) => {
  if (payload && payload.response) {
    const { status } = payload.response;
    switch (status) {
      case 404:
        window.location.pathname = '/not-found';
        break;
      case 500 || 501:
        window.location.pathname = '/server-error';
        break;
      default:
        return payload;
    }
  }
}

export default api;
