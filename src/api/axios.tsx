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
    "X-API-KEY": "5cdb95f6-2a0c-4609-805b-644b28a4d37f",
    Accept: "*/*",
  },
});

export const authHeaders = () => {
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
}

interface ApiPostParams extends ApiBaseParams {
  data?: object | null;
}

interface ApiPatchParams extends ApiBaseParams {
  data?: object | null;
}

interface ApiDeleteParams extends ApiBaseParams {
  params?: object | null;
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

const apiPatch = async ({ url, data, config }: ApiPatchParams) => {
  try {
    const response = await baseClient.patch(url, data, {
      ...config,
      headers: { ...authHeaders() },
    });

    return response;
  } catch (err) {
    handleApiErrors(err);
    return null;
  }
};

const apiDelete = async ({ url, config }: ApiDeleteParams) => {
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

const defaultApi = {
  baseClient,
  apiGet,
  apiGetFiles,
  apiPostFiles,
  apiPost,
  apiPatch,
  apiDelete,
};
export default defaultApi;
