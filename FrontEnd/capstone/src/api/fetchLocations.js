import apiClient from './axiosConfig';

export const fetchLocations = async (keyword) => {
  console.log('Fetching locations for keyword:', keyword); // Log input parameter

  if (keyword.length > 2) {
    try {
      const response = await axios.get('http://localhost:8080/api/locations?keyword=test');
      console.log('Response data:', response.data); // Log response data

      return response.data.map(location => ({
        label: `${location.name} (${location.iataCode})`,
        value: location.iataCode,
      }));
    } catch (error) {
      console.error('Error fetching locations:', error); // Log error
      throw error;
    }
  } else {
    return [];
  }
};
