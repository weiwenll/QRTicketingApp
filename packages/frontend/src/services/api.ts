import axios from 'axios';
import { UserRegistrationData } from './types';

const apiClient = axios.create({
  baseURL: 'http://localhost:5500',
  // add more default settings here
});

export const registerUser = async (data: UserRegistrationData) => {
  try {
    const response = await apiClient.post('/api/v1/auth/Register', data);
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export default apiClient;