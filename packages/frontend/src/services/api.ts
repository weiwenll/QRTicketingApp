import axios, { AxiosError } from 'axios';
import { UserLoginData, UserRegistrationData } from './types';

const apiClient = axios.create({
  baseURL: 'http://localhost:5500',
  // add more default settings here
});

export const registerUser = async (data: UserRegistrationData) => {
  try {
    const response = await apiClient.post('tg_query_api/api/v1/auth/Register', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
  }
};

export const loginUser = async (data: UserLoginData) => {
  try {
    const response = await apiClient.post('tg_query_api/api/v1/auth/Login', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
  }
};

export default apiClient;