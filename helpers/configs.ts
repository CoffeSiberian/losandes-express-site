import dotenv from "dotenv";
import { DiscordRoles } from "../types/configsTypes";
dotenv.config();

const roles = process.env.DISCORD_ROLES_ID!.split(",");

export const PORT: string = process.env.PORT!;
export const CACHE_TIME: string = process.env.CACHE_TIME!;

export const SECRET_CAPCHA = process.env.SECRET_CAPCHA;

export const DISCORD_WEBHOOK_URL: string = process.env.DISCORD_WEBHOOK_URL!;
export const DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN!;
export const DISCORD_ID_SERVER: string = process.env.DISCORD_ID_SERVER!;
export const DISCORD_ROLES_ID: DiscordRoles = {
    roles_id: roles,
};

export const BASE_IA_URL: string = process.env.BASE_IA_URL!;
export const IA_CHAT_ENDPOINT: string = process.env.IA_CHAT_ENDPOINT!;
export const PASSWORD_HASH: string = process.env.PASSWORD_HASH!;
