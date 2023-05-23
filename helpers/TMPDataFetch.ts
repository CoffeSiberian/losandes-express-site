import { dataGet } from "./dataFetch";

const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
};

const TMPDataGet = async (url: string): Promise<any | undefined> => {
    const apiResponse = await dataGet({ headers: headers }, url);
    try {
        if (!apiResponse) throw new Error("Error");
        if (apiResponse.status !== 200) throw new Error("Error");

        const json = await apiResponse.data;
        return json;
    } catch (e) {
        return undefined;
    }
};

export { TMPDataGet };
