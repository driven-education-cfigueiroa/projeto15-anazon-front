import axios from 'axios';
import axiosRetry from 'axios-retry';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const timeout = process.env.REACT_APP_API_TIMEOUT || 2000;

export const api = axios.create({ baseURL, timeout });

axiosRetry(api, {
  retries: 3,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED'
    );
  },
});
