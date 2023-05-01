import NodeCache from "node-cache";
import { CACHE_TIME } from "../helpers/configs";

export const queryCache = new NodeCache({
    stdTTL: parseInt(CACHE_TIME),
    checkperiod: 100,
});
