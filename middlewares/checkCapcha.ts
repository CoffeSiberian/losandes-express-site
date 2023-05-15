import { dataPost } from "../helpers/dataFetch";
import { CapchaType } from "../types/api/capchaTypes";
import { SECRET_CAPCHA } from "../helpers/configs";
import { AxiosResponse } from "axios";

const headers = {
    "Content-Type": "application/json",
};

const checkCapcha = async (token: string): Promise<boolean> => {
    const apiResponse: boolean | AxiosResponse | CapchaType = await dataPost(
        { headers },
        JSON.stringify({}),
        `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_CAPCHA}&response=${token}`
    );

    try {
        if (!apiResponse) throw new Error("Error");
        if (apiResponse.status !== 200) throw new Error("Error");
        const response: CapchaType = apiResponse.data;
        return response.success;
    } catch (e) {
        return false;
    }
};

export default checkCapcha;
