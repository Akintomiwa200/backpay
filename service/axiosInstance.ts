import axios, { AxiosResponse } from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:3000/api/v1';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
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
