import { Express } from "express";
import {
    checkValuesApiResponse,
    checkAuthorizedDomains,
    checkValuesContact,
    checkValuesIaChat,
    capchaCheck,
    protectRoute,
    checkIdUrl,
    isCached,
} from "../middlewares/appMiddleware";

// POST
import getApiResponse from "./getApiResponse";
import postIaChat from "./postIaChat";
import postContact from "./postContact";

// GET
import getEvents from "./tmp_queries/getEvents";
import getNews from "./tmp_queries/getNews";
import getMembers from "./tmp_queries/getMembers";
import getNew from "./tmp_queries/getNew";
import getMemberInfo from "./tmp_queries/getMemberInfo";
import getPartnerLogo from "./getPartnerLogo";
import getHallOfFame from "./getHallOfFame";

export default function (app: Express) {
    // POST
    app.post(
        "/getApiResponse/",
        checkValuesApiResponse,
        checkAuthorizedDomains,
        (req, res, next) => isCached(req, res, next, req.body.url),
        getApiResponse
    );
    app.post("/postIaChat/", checkValuesIaChat, protectRoute, postIaChat);
    app.post("/postContact/", checkValuesContact, capchaCheck, postContact);

    // GET
    app.get("/getPartnerLogo/:name", getPartnerLogo);
    app.get(
        "/getHallOfFame/",
        (req, res, next) => isCached(req, res, next, "hallOfFame"),
        getHallOfFame
    );
    app.get(
        "/getEvents/",
        (req, res, next) => isCached(req, res, next, "events"),
        getEvents
    );
    app.get(
        "/getNews/",
        (req, res, next) => isCached(req, res, next, "news"),
        getNews
    );
    app.get(
        "/getMembers/",
        (req, res, next) => isCached(req, res, next, "members"),
        getMembers
    );
    app.get(
        "/getNew/:id",
        checkIdUrl,
        (req, res, next) => isCached(req, res, next, `new/${req.params.id}`),
        getNew
    );
    app.get(
        "/getMemberInfo/:id",
        checkIdUrl,
        (req, res, next) => isCached(req, res, next, `member/${req.params.id}`),
        getMemberInfo
    );
}
