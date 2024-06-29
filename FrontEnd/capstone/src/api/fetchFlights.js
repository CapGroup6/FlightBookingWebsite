import apiClient from './axiosConfig';

export const fetchFlights = async (params) => {
  console.log('Fetching flights with params:', params); // Log input parameters

  try {
    const response = await apiClient.get('/flights', { params });
    console.log('Response data:', response.data); // Log response data

    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error); // Log error
    throw error;
  }
};
