import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { api_uri } from '../constants';
import { loadFromSessionStorage } from '../store/sesionStorage';

export class ApiService {
  private static get bearerToken(): string | null {
    const token = loadFromSessionStorage()?.accessToken;

    return token ? `Bearer ${token}` : null;
  }

  static async request<T>(
    url: string,
    method: Method = 'GET',
    headers?: Record<string, string>,
    rest?: AxiosRequestConfig,
    overrideToken?: string
  ): Promise<AxiosResponse<T>> {
    const token = overrideToken || this.bearerToken;

    return axios
      .request({
        url,
        method,
        baseURL: api_uri,
        headers: {
          Accept: 'application/json',
          AcceptEncoding: 'gzip',
          ...(token && { Authorization: token }),
          ...(headers && headers),
        },
        ...(rest && rest),
        validateStatus: () => true,
      })
      .then((response: AxiosResponse<T>) => {
        const { status, data } = response;

        if (status === 401 || status === 403 || status >= 500) {
          console.error(status, data);
          throw data;
        }

        return response;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
  }

  static validateStatus(response: AxiosResponse, maxValidStatus = 300): void {
    const { status, data } = response;

    if (status >= maxValidStatus) {
      console.error(status, data);
      throw data;
    }
  }
}
