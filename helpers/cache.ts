import NodeCache from "node-cache";
import { CacheTypes } from "../types/cacheTypes";
import { CACHE_TIME } from "../helpers/configs";

const queryCache = new NodeCache({
    stdTTL: parseInt(CACHE_TIME),
    checkperiod: 100,
});

const getCache = (key: string): CacheTypes | undefined => {
    return queryCache.get(key);
};

const setCache = (key: string, data: CacheTypes): void => {
    queryCache.set(key, data);
};

export { getCache, setCache };
