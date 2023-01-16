import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenStatic } from "axios";

interface Interceptor {
  onFulfilled: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onRejected: (error: AxiosError) => Promise<AxiosError>;
}

export interface HttpClientOptions extends AxiosRequestConfig {
  requestInterceptors?: Interceptor[];
  responseInterceptors?: Interceptor[];
}

export interface ApiResponse<T> extends AxiosResponse {
  result: T;
}

export default class HttpClient {
  private readonly axios: AxiosInstance;

  CancelToken: CancelTokenStatic;

  constructor(baseURL: string, options: HttpClientOptions = {}) {
    const { requestInterceptors = [], responseInterceptors = [], headers = {}, ...rest } = options;

    this.CancelToken = axios.CancelToken;

    this.axios = axios.create({
      baseURL,
      headers,
      ...rest,
    });

    requestInterceptors.forEach((interceptorConfig) => {
      this.axios.interceptors.request.use(
        (conf) => interceptorConfig.onFulfilled(conf),
        (error) => interceptorConfig.onRejected(error)
      );
    });

    responseInterceptors.forEach((interceptorConfig) => {
      this.axios.interceptors.response.use(
        (conf) => interceptorConfig.onFulfilled(conf),
        (error) => {
          if (error.message === "Retried request") {
            return Promise.reject(error);
          }

          return interceptorConfig.onRejected(error);
        }
      );
    });
  }

  async request(options: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await this.axios.request(options);

    return response.data;
  }

  async get<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.axios.get(path, options);

    return response.data;
  }

  async post<T, D = unknown>(path: string, data: D, options?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> {
    const response = await this.axios.post(path, data, options);

    return response.data;
  }

  async put<T, D = unknown>(path: string, data: D, options: AxiosRequestConfig<D>): Promise<ApiResponse<T>> {
    const response = await this.axios.put(path, data, options);

    return response.data;
  }

  async patch<T, D = unknown>(path: string, data: D, options: AxiosRequestConfig<D>): Promise<ApiResponse<T>> {
    const response = await this.axios.patch(path, data, options);

    return response.data;
  }

  async delete<T>(path: string, options: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axios.delete(path, options);

    return response.data;
  }

  getAxiosInstance(): AxiosInstance {
    return this.axios;
  }

  static isCancel(error: Error): boolean {
    return axios.isCancel(error);
  }
}
