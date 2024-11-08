import { Request, Response as apiResponse } from "express";
import { setCache } from "../../helpers/cache";
import { TMPDataGet } from "../../helpers/TMPDataFetch";
import { TRUCKERSMP_API_URL, TRUCKERSMP_VTC_ID } from "../../helpers/configs";

const getNew = async (req: Request, res: apiResponse): Promise<any> => {
    const url = `${TRUCKERSMP_API_URL}vtc/${TRUCKERSMP_VTC_ID}/news/${req.params.id}`;

    const response = await TMPDataGet(url);

    if (!response) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

    setCache(`new/${req.params.id}`, {
        data: response,
    });
    res.send(response);
};

export default getNew;
