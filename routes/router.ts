import { Express } from "express";
import {
    checkValuesContact,
    capchaCheck,
    checkIdUrl,
    isCached,
} from "../middlewares/appMiddleware";

// POST
import postContact from "./postContact";

// GET
import getEvents from "./tmp_queries/getEvents";
import getNews from "./tmp_queries/getNews";
import getMembers from "./tmp_queries/getMembers";
import getNew from "./tmp_queries/getNew";
import getMemberInfo from "./tmp_queries/getMemberInfo";
import getPartnerLogo from "./getPartnerLogo";
import getHallOfFame from "./getHallOfFame";
import getSummary from "./getSummary";

export default function (app: Express) {
    // POST
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
    app.get(
        "/getSummary/",
        (req, res, next) => isCached(req, res, next, "summary"),
        getSummary
    );
}
