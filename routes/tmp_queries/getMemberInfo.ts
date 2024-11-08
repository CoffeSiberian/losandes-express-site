import { Request, Response as apiResponse } from "express";
import { setCache } from "../../helpers/cache";
import { TMPDataGet } from "../../helpers/TMPDataFetch";
import { TRUCKERSMP_API_URL } from "../../helpers/configs";

const getMemberInfo = async (req: Request, res: apiResponse): Promise<any> => {
    const url = `${TRUCKERSMP_API_URL}player/${req.params.id}`;

    const response = await TMPDataGet(url);

    if (!response) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

    setCache(`member/${req.params.id}`, {
        data: response,
    });
    res.send(response);
};

export default getMemberInfo;
