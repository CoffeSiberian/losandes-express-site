import { Request, Response } from "express";
import { BodyGetTypesNull } from "../types/bodyGetTypes";
import { BodyGetTypes } from "../types/bodyGetTypes";
import { queryCache } from "../helpers/cache";
import { CacheTypes } from "../types/cacheTypes";

const checkValues = async (
    req: Request,
    res: Response,
    next: Function
): Promise<Function | void> => {
    let bodyData: BodyGetTypesNull = req.body;
    if (
        !(
            bodyData.url === undefined ||
            bodyData.headers === undefined ||
            bodyData === undefined
        )
    )
        return next();
    res.status(500);
    res.send({ error: "need more data" });
};

const isCached = async (
    req: Request,
    res: Response,
    next: Function
): Promise<Function | void> => {
    let bodyData: BodyGetTypes = req.body;
    let cachedData: CacheTypes | undefined = queryCache.get(bodyData.url);

    if (!cachedData) return next();

    res.status(cachedData.status);
    res.send(cachedData.data);
};

export { checkValues, isCached };
