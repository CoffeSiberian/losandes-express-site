import { Request, Response, NextFunction } from "express";
import { BodyGetTypesNull, BodyGetTypes } from "../types/bodyGetTypes";
import {
    ContactBodyNotValid,
    ContactBodyValid,
} from "../types/contactBodyTypes";
import checkCapcha from "./checkCapcha";
import { getCache } from "../helpers/cache";
import { CacheTypes } from "../types/cacheTypes";

const checkValuesContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bodyData: ContactBodyNotValid = req.body;
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

const capchaCheck = async (req: Request, res: Response, next: NextFunction) => {
    const bodyData: ContactBodyValid = req.body;
    const capchaResult = await checkCapcha(bodyData.captcha);
    if (capchaResult) return next();
    res.sendStatus(401);
};

const checkIdUrl = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (id === undefined) {
        res.status(404);
        res.json({ error: "need more data" });
        return;
    }
    return next();
};

const isCached = async (
    req: Request,
    res: Response,
    next: NextFunction,
    cacheKey: string
) => {
    const cachedData: CacheTypes | undefined = getCache(cacheKey);

    if (!cachedData) return next();

    res.send(cachedData.data);
};

export { checkValuesContact, capchaCheck, checkIdUrl, isCached };
