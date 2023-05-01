import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT!;
export const CACHE_TIME = process.env.CACHE_TIME!;
