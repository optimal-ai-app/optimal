import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from "axios";
import { Platform } from "react-native";

// Use environment variable for API URL if available, fallback to localhost
const API_URL = process.env.REACT_APP_API_URL ||
    'https://4739-2601-646-8f80-94e0-6d10-c8b1-d11d-b215.ngrok-free.app';

class HttpService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 100000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(
                url,
                config
            );
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(
                url,
                data,
                config
            );
            console.log('response', response)
            return response.data;
        } catch (error) {
            console.log('error', error)
            return Promise.reject(error);
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(
                url,
                config
            );
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const httpService = new HttpService("https://05c6-2601-646-8f80-94e0-74bd-ec96-ea70-b962.ngrok-free.app");
export default httpService;