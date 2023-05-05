import { AxiosRequestHeaders } from "axios";

interface BodyGetTypesNull {
    url: string | null;
    headers: AxiosRequestHeaders | null;
}

interface BodyGetTypes {
    url: string;
    headers: AxiosRequestHeaders;
}

export { BodyGetTypesNull, BodyGetTypes };
