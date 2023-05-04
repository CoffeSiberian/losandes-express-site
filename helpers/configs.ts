import dotenv from "dotenv";
import { DiscordRoles } from "../types/configsTypes";
dotenv.config();

export const PORT: string = process.env.PORT!;
export const CACHE_TIME: string = process.env.CACHE_TIME!;

export const DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN!;
export const DISCORD_ID_SERVER: string = process.env.DISCORD_ID_SERVER!;
export const DISCORD_ROLES_ID: DiscordRoles = JSON.parse(
    process.env.DISCORD_ROLES_ID!
);
