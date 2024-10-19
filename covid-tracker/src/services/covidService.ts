// src/services/covidService.ts
import axios from 'axios';

// Create a function to fetch COVID data from the API
export const fetchCovidData = async () => {
  try {
    const response = await axios.get('https://api.rootnet.in/covid19-in/stats/latest');
    return response.data;  // Returning the data received from the API
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error;  // Throw an error if something goes wrong
  }
};
