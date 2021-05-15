import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IError {
  error: string;
}

axios.interceptors.request.use((config) => {
  // when we are running inside engine
  const token = localStorage.getItem("user.token");

  return {
    ...config,
    baseURL: "http://localhost:8000",
    headers: {
      ...config.headers,
      Authorization: token,
    },
  };
});

export default axios;

export interface IAxiosResponseError<T = IError> {
  config: AxiosRequestConfig;
  request?: any;
  response: AxiosResponse<T>;
}
