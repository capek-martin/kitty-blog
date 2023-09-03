import axios, { AxiosRequestConfig } from "axios";
import { handleApiErrors } from "./apiErrorHandler";
import { storageKeys } from "../utils/keys/storageKeys";

const commonHeaders = {
  "Content-Type": "application/json",
  "X-API-KEY": "5cdb95f6-2a0c-4609-805b-644b28a4d37f",
};

const baseClient = axios.create({
  baseURL: "/api/",
  headers: commonHeaders,
});

const baseClientFiles = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
  },
});

export const authHeaders = () => {
  // TODO - local storage
  /* return {
    Authorization: `Bearer 0c1af414-6120-4af6-be16-0d1b1c3e9a88`,
  }; */

  let token = null;
  if (localStorage.getItem(storageKeys.BEARER_TOKEN_KEY))
    token = localStorage.getItem(storageKeys.BEARER_TOKEN_KEY);
  if (sessionStorage.getItem(storageKeys.BEARER_TOKEN_KEY))
    token = sessionStorage.getItem(storageKeys.BEARER_TOKEN_KEY);
  if (token) {
    return {
      Authorization: `Bearer ${JSON.parse(token)}`,
    };
  }
  return null;
};

interface ApiBaseParams {
  url: string;
  config?: AxiosRequestConfig | null;
}

interface ApiGetParams extends ApiBaseParams {
  params?: object | null;
  setIsOnline?: (state: boolean) => void;
}

interface ApiPostParams extends ApiBaseParams {
  data?: object | null;
  setIsOnline?: (state: boolean) => void;
}

interface ApiPutParams extends ApiBaseParams {
  data?: object | null;
  setIsOnline?: (state: boolean) => void;
}

interface ApiDeleteParams extends ApiBaseParams {
  params?: object | null;
  setIsOnline?: (state: boolean) => void;
}

const apiGet = async ({ url, /*params, */ config }: ApiGetParams) => {
  try {
    const response = await baseClient.get(url, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

const apiGetFiles = async ({ url, config }: ApiGetParams) => {
  try {
    const response = await baseClientFiles.get(url, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

const apiPostFiles = async ({ url, data, config }: ApiPostParams) => {
  try {
    const response = await baseClientFiles.post(url, data, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

const apiPost = async ({ url, data, config }: ApiPostParams) => {
  try {
    const response = await baseClient.post(url, data, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

const apiPut = async ({ url, data, config }: ApiPutParams) => {
  try {
    const response = await baseClient.put(url, data, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

const apiDelete = async ({ url, /*params, */ config }: ApiDeleteParams) => {
  try {
    const response = await baseClient.delete(url, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

/* export const postHeaders = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
}; */

const defaultApi = {
  baseClient,
  apiGet,
  apiGetFiles,
  apiPostFiles,
  apiPost,
  apiPut,
  apiDelete,
};
export default defaultApi;
