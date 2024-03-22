import axios, { AxiosError } from 'axios';
import { UserLoginData, UserRegistrationData } from './types';

const apiClient = axios.create({
  baseURL: 'http://localhost:5500/tg_query_api/api/v1/',
  // add more default settings here
});

export enum ApiMethod {
  REGISTER = 'auth/Register',
  AUTHENTICATE = 'auth/Authenticate',
  GETALLTRAINFARE = 'fares/GetAllTrainFare',
  GETTRAINROUTES = 'routes/GetTrainRoutes',
  GETTICKETS = 'tickets/Tickets',
  GETTRAINFARE = 'fares/GetTrainFare',
  PURCHASETICKET = 'tickets/PurchaseTicket',
  CREATEPAYMENTINTENT = 'payments/CreatePaymentIntent',
  GETUSERS = 'users/GetUsers',
  // Add more endpoints as needed
}

export const registerUser = async (data: UserRegistrationData) => {
  try {
    const response = await apiClient.post(ApiMethod.REGISTER, data);
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
    const response = await apiClient.post(ApiMethod.AUTHENTICATE, data);
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


export async function fetchDataWithoutParam(endpoint: string) {
  try {
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function fetchDataByParam(endpoint: string, params: any) {
  try {
    const response = await apiClient.get(endpoint,  params );
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function postDataByParams(endpoint: string, params: any, headers: any) {
  try {
    const response = await apiClient.post(endpoint, params, headers);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw new Error('Failed to post data');
  }
}

export default apiClient;