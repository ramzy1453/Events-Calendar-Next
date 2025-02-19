import { HTTPResponse } from "@/types/response.d";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
if (!baseURL) {
  console.warn("🔴 Environment variable NEXT_PUBLIC_API_URL is not set");
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

type HTTPRequestConfig = AxiosRequestConfig;

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: HTTPRequestConfig = {}) => {
      try {
        return axios.get<HTTPResponse<T>>(url, config);
      } catch (error) {
        if (error instanceof AxiosError) {
          return error.response?.data;
        }
      }
    },
    delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
      try {
        return axios.delete<HTTPResponse<T>>(url, config);
      } catch (error) {
        if (error instanceof AxiosError) {
          return error.response?.data;
        }
      }
    },
    put: <T, P>(url: string, body: P, config: HTTPRequestConfig = {}) => {
      return axios.put<HTTPResponse<T>>(url, body, config);
    },
    patch: <T, P>(url: string, body: P, config: HTTPRequestConfig = {}) => {
      return axios.patch<HTTPResponse<T>>(url, body, config);
    },
    post: <T, P>(url: string, body: P, config: HTTPRequestConfig = {}) => {
      return axios.post<HTTPResponse<T>>(url, body, config);
    },
  };
};

export const Http = api(instance);
