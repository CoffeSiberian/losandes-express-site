import { Request, Response as apiResponse } from "express";
import { getFetch } from "../helpers/dataFetch";
import { BodyGetTypes } from "../types/bodyGetTypes";
import { queryCache } from "../helpers/cache";

const getApiResponse = async (req: Request, res: apiResponse) => {
    let bodyData: BodyGetTypes = req.body;

    let apiResponse = await getFetch(
        null,
        bodyData.headers,
        new URL(bodyData.url)
    );

    res.status(apiResponse.status);
    try {
        let json = await apiResponse.json();
        queryCache.set(bodyData.url, {
            data: json,
            status: apiResponse.status,
        });
        res.send(json);
    } catch (e) {
        res.status(404);
        res.send(JSON.stringify({ error: "The API did not return a json" }));
    }
};

export default getApiResponse;
