import axios from 'axios';

let baseUrl: string;

switch (import.meta.env.MODE) {
  case 'development':
    baseUrl = import.meta.env.VITE_API_URL_DEV;
    break;
  case 'staging':
    baseUrl = import.meta.env.VITE_API_URL_STAGING;
  default:
    baseUrl = import.meta.env.VITE_API_URL_PROD;
    break;
}

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}}`,
  },
  withCredentials: true,
});
