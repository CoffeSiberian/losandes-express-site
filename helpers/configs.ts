import dotenv from "dotenv";
import {
    DiscordRoles,
    DiscordRolesFeatured,
    TruckersMPStaff,
} from "../types/configsTypes";
dotenv.config();

const roles = process.env.DISCORD_ROLES_ID!.split(",");
const roles_Featured = process.env.DISCORD_ROLES_ID_FEATURED!.split(",");
const TRUCKERSMP_STAFF_ID_SPLIT = process.env.TRUCKERSMP_STAFF_ID!.split(",");

export const PORT: string = process.env.PORT!;
export const CACHE_TIME: string = process.env.CACHE_TIME!;

export const TRUCKERSMP_API_URL: string = process.env.TRUCKERSMP_API_URL!;
export const TRUCKERSMP_VTC_ID: string = process.env.TRUCKERSMP_VTC_ID!;
export const TRUCKERSMP_STAFF_ID: TruckersMPStaff = {
    staff_id: TRUCKERSMP_STAFF_ID_SPLIT,
};

export const SECRET_CAPCHA = process.env.SECRET_CAPCHA;

export const DISCORD_WEBHOOK_URL: string = process.env.DISCORD_WEBHOOK_URL!;
export const DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN!;
export const DISCORD_ID_SERVER: string = process.env.DISCORD_ID_SERVER!;
export const DISCORD_ROLES_ID_FEATURED: DiscordRolesFeatured = {
    roles_id: roles_Featured,
};
export const DISCORD_ROLES_ID: DiscordRoles = {
    roles_id: roles,
};
export const DISCORD_INVITE_CODE: string = process.env.DISCORD_INVITE_CODE!;

export const ALLOWEDHEADERS: string = process.env.ALLOWEDHEADERS!;
export const ALLOWEDORIGIN: string = process.env.ALLOWEDORIGIN!;
