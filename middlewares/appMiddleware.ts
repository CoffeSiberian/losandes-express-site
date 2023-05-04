import { Request, Response, NextFunction } from "express";
import { BodyGetTypesNull } from "../types/bodyGetTypes";
import { BodyGetTypes } from "../types/bodyGetTypes";
import { getCache } from "../helpers/cache";
import { CacheTypes } from "../types/cacheTypes";

const checkValues = async (
    req: Request,
    res: Response,
    next: NextFunction
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
    next: NextFunction,
    cacheKey: string
): Promise<Function | void> => {
    let bodyData: BodyGetTypes = req.body;
    let cachedData: CacheTypes | undefined = getCache(cacheKey);

    if (!cachedData) return next();

    res.status(cachedData.status);
    res.send(cachedData.data);
};

export { checkValues, isCached };
