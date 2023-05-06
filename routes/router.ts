import { Express } from "express";
import {
    checkValuesApiResponse,
    checkValuesIaChat,
    protectRoute,
    isCached,
} from "../middlewares/appMiddleware";

// POST
import getApiResponse from "./getApiResponse";
import postIaChat from "./postIaChat";

// GET
import getPartnerLogo from "./getPartnerLogo";
import getHallOfFame from "./getHallOfFame";

export default function (app: Express) {
    // POST
    app.post(
        "/getApiResponse/",
        checkValuesApiResponse,
        (req, res, next) => isCached(req, res, next, req.body.url),
        getApiResponse
    );
    app.post("/postIaChat/", checkValuesIaChat, protectRoute, postIaChat);

    // GET
    app.get("/getPartnerLogo/:name", getPartnerLogo);
    app.get(
        "/getHallOfFame/",
        (req, res, next) => isCached(req, res, next, "hallOfFame"),
        getHallOfFame
    );
}
