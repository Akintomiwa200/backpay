import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api/v1', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

export const httpGet = async (
  url: string,
  params = {}
): Promise<AxiosResponse> => {
  return axiosInstance.get(url, { params });
};

export const httpPost = async (
  url: string,
  data = {}
): Promise<AxiosResponse> => {
  return axiosInstance.post(url, data);
};

export const httpPatch = async (
  url: string,
  data = {}
): Promise<AxiosResponse> => {
  return axiosInstance.patch(url, data);
};

export const httpDelete = async (
  url: string,
  data = {}
): Promise<AxiosResponse> => {
  return axiosInstance.delete(url, data);
};
