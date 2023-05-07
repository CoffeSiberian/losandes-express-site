import { Request, Response as apiResponse } from "express";
import { dataGet } from "../helpers/dataFetch";
import { BodyGetTypes } from "../types/bodyGetTypes";
import { setCache } from "../helpers/cache";

const getApiResponse = async (req: Request, res: apiResponse) => {
    let bodyData: BodyGetTypes = req.body;

    let apiResponse = await dataGet(
        { headers: bodyData.headers },
        bodyData.url
    );

    try {
        if (!apiResponse || !("data" in apiResponse)) throw new Error("Error");
        if (apiResponse.status !== 200) throw new Error("Error");

        let json = await apiResponse.data;
        setCache(bodyData.url, {
            data: json,
        });
        res.send(json);
    } catch (e) {
        res.status(404);
        res.send(JSON.stringify({ error: 404 }));
    }
};

export default getApiResponse;
