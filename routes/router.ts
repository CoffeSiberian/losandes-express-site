import { Express } from "express";
import { checkValues, isCached } from "../middlewares/appMiddleware";

// POST
import getApiResponse from "./getApiResponse";

// GET
import getPartnerLogo from "./getPartnerLogo";

export default function (app: Express) {
    app.post("/getApiResponse/", checkValues, isCached, getApiResponse);
    app.get("/getPartnerLogo/:name", getPartnerLogo);
}
