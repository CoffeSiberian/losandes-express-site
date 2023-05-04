import { Express } from "express";
import { checkValues, isCached } from "../middlewares/appMiddleware";

// POST
import getApiResponse from "./getApiResponse";

// GET
import getPartnerLogo from "./getPartnerLogo";
import getHallOfFame from "./getHallOfFame";

export default function (app: Express) {
    // POST
    app.post(
        "/getApiResponse/",
        checkValues,
        (req, res, next) => isCached(req, res, next, req.body.url),
        getApiResponse
    );

    // GET
    app.get("/getPartnerLogo/:name", getPartnerLogo);
    app.get(
        "/getHallOfFame/",
        (req, res, next) => isCached(req, res, next, "hallOfFame"),
        getHallOfFame
    );
}
