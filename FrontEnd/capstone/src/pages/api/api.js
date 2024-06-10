
import axios from 'axios';

const API_BASE_URL = 'https://test.api.amadeus.com/v2';
const API_KEY = 'o6PPlepgAHP5r3oD5xnzmfHancZrhXE9';
const API_SECRET = 'NSoXICEjs9dgTvXy';

let accessToken = '';

const getAccessToken = async () => {
  const response = await axios.post(`${API_BASE_URL}/security/oauth2/token`, {
    grant_type: 'client_credentials',
    client_id: API_KEY,
    client_secret: API_SECRET,
  });
  accessToken = response.data.access_token;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!accessToken) {
      await getAccessToken();
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchFlights = async (params) => {
  const response = await apiClient.get('/shopping/flight-offers', { params });
  return response.data.data;
};

export default apiClient;
