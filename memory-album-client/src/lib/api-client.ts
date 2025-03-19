import Axios from 'axios';

const USE_LOGGING = true;

export const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

if (USE_LOGGING) {
  api.interceptors.request.use((request) => {
    console.log('Starting Request', request.url, request);
    return request;
  });

  api.interceptors.response.use((response) => {
    console.log('Response:', response.statusText, response); // JSON.stringify(response, null, 2)
    return response;
  });
}
