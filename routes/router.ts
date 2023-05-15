import { Express } from "express";
import {
    checkValuesApiResponse,
    checkValuesContact,
    checkValuesIaChat,
    protectRoute,
    isCached,
} from "../middlewares/appMiddleware";

// POST
import getApiResponse from "./getApiResponse";
import postIaChat from "./postIaChat";
import postContact from "./postContact";

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
    app.post("/postContact/", checkValuesContact, postContact);

    // GET
    app.get("/getPartnerLogo/:name", getPartnerLogo);
    app.get(
        "/getHallOfFame/",
        (req, res, next) => isCached(req, res, next, "hallOfFame"),
        getHallOfFame
    );
}
