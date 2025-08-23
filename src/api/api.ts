import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export const api = axios.create({
  baseURL: window.__ENV_API_URL__ || import.meta.env.VITE_API_URL,
  timeout: 300000, // 5 minutes
});

const onRequest = async (config: AxiosRequestConfig): Promise<any> => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);

//////////////

export const apiFormData = axios.create({
  baseURL: window.__ENV_API_URL__ || import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 30000, // 5 minutes
});

const onFormDataRequest = async (config: AxiosRequestConfig): Promise<any> => {
  const formData = config.data || new FormData();
  config.data = formData;
  return config;
};

apiFormData.interceptors.request.use(onFormDataRequest, onRequestError);
apiFormData.interceptors.response.use(onResponse, onResponseError);
