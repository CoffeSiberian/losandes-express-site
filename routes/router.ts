import { Express } from "express";
import { checkValues, isCached } from "../middlewares/appMiddleware";

// POST
import getApiResponse from "./getApiResponse";

// GET

export default function (app: Express) {
    app.post("/api/getApiResponse/", checkValues, isCached, getApiResponse);
}
