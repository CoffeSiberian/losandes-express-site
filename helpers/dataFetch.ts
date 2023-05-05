import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const dataGet = async (
    optios: AxiosRequestConfig | undefined,
    url: string
): Promise<AxiosResponse | false> => {
    try {
        return await axios.get(url, optios);
    } catch (e) {
        return false;
    }
};

const dataPost = async (
    optios: AxiosRequestConfig | undefined,
    payload: string,
    url: string
): Promise<AxiosResponse | false> => {
    try {
        return await axios.post(url, payload, optios);
    } catch (e) {
        return false;
    }
};

export { dataGet, dataPost };
