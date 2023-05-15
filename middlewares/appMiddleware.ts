import { Request, Response, NextFunction } from "express";
import { BodyGetTypesNull } from "../types/bodyGetTypes";
import { ContactBodyNotValid } from "../types/contactBodyTypes";
import { getCache } from "../helpers/cache";
import { CacheTypes } from "../types/cacheTypes";
import { checkHash } from "../helpers/hash";
import { PASSWORD_HASH } from "../helpers/configs";

const checkValuesApiResponse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Function | void> => {
    const bodyData: BodyGetTypesNull = req.body;
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

const checkValuesIaChat = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Function | void> => {
    const bodyData = req.body;
    if (
        !(
            bodyData.prompt === undefined ||
            bodyData.pass === undefined ||
            bodyData.user_id === undefined
        )
    ) {
        return next();
    }
    res.status(500);
    res.send({ error: "need more data" });
};

const checkValuesContact = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Function | void> => {
    const bodyData = req.body;
    if (
        !(
            bodyData.name === undefined ||
            bodyData.email === undefined ||
            bodyData.reason === undefined ||
            bodyData.message === undefined ||
            bodyData.captcha === undefined
        )
    ) {
        return next();
    }
    res.status(500);
    res.send({ error: "need more data" });
};

const protectRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Function | void> => {
    const bodyData = req.body.pass;

    checkHash(bodyData, PASSWORD_HASH, (result: boolean) => {
        if (result) return next();
        res.status(401);
        res.send({ error: "unauthorized" });
    });
};

const isCached = async (
    req: Request,
    res: Response,
    next: NextFunction,
    cacheKey: string
): Promise<Function | void> => {
    const cachedData: CacheTypes | undefined = getCache(cacheKey);

    if (!cachedData) return next();

    res.send(cachedData.data);
};

export {
    checkValuesApiResponse,
    checkValuesContact,
    checkValuesIaChat,
    protectRoute,
    isCached,
};
