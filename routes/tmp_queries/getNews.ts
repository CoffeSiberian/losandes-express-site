import { Request, Response as apiResponse } from "express";
import { TMPDataGet } from "../../helpers/TMPDataFetch";
import { setCache } from "../../helpers/cache";
import { TRUCKERSMP_API_URL, TRUCKERSMP_VTC_ID } from "../../helpers/configs";

const getNews = async (req: Request, res: apiResponse): Promise<any> => {
    const url = `${TRUCKERSMP_API_URL}vtc/${TRUCKERSMP_VTC_ID}/news`;

    const response = await TMPDataGet(url);

    if (!response) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

    setCache("news", {
        data: response,
    });
    res.send(response);
};

export default getNews;
