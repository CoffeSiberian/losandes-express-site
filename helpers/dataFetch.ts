import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const dataGet = async (
    options: AxiosRequestConfig | undefined,
    url: string
): Promise<AxiosResponse | false> => {
    try {
        return await axios.get(url, options);
    } catch (e) {
        return false;
    }
};

const dataPost = async (
    options: AxiosRequestConfig,
    payload: string,
    url: string
): Promise<AxiosResponse | false> => {
    try {
        return await axios.post(url, payload, options);
    } catch (e) {
        return false;
    }
};

export { dataGet, dataPost };
