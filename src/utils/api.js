import axios from 'axios';

require('dotenv').config({ path: '../../.env' });

export const baseURL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  response => response,
  error => errorInterceptor(error),
);

api.interceptors.request.use(
  response => response,
  error => errorInterceptor(error),
);

export const errorInterceptor = (payload) => {
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
