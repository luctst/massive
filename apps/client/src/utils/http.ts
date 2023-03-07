import axios from 'axios';

let baseUrl: string;

if (import.meta.env.DEV) {
  baseUrl = import.meta.env.VITE_API_URL_DEV;
} else {
  baseUrl = import.meta.env.VITE_API_URL_PROD;
}

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}}`,
  },
  withCredentials: true,
});
