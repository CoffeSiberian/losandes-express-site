import { Request, Response } from "express";
import { dataGet } from "../helpers/dataFetch";
import { ListMembers, Member } from "../types/api/discordTypes";
import { setCache } from "../helpers/cache";
import { AxiosRequestConfig } from "axios";
import {
    DISCORD_BOT_TOKEN,
    DISCORD_ID_SERVER,
    DISCORD_ROLES_ID,
    DISCORD_ROLES_ID_FEATURED,
} from "../helpers/configs";

const getUsersHallOfFame = (
    members: ListMembers
): Array<Member | undefined> => {
    const discordRoles = DISCORD_ROLES_ID.roles_id;
    const featuredRoles = DISCORD_ROLES_ID_FEATURED.roles_id;
    let usersHallOfFame: Array<Member | undefined> = [];

    members.members.map((member) => {
        let userRoles = member.roles;
        let userFeatured = false;

        let userHallOfFame = userRoles.filter((role) => {
            if (role === undefined) return false;
            if (featuredRoles.includes(role)) userFeatured = true;
            return discordRoles.includes(role);
        });

        if (userHallOfFame.length > 0) {
            member.featured = userFeatured;
            usersHallOfFame.push(member);
        }
    });
    return usersHallOfFame;
};

const getHallOfFame = async (req: Request, res: Response): Promise<any> => {
    const optios: AxiosRequestConfig = {
        headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            "Content-Type": "application/json",
        },
    };

    const apiResponse = await dataGet(
        optios,
        `https://discord.com/api/guilds/${DISCORD_ID_SERVER}/members?limit=1000`
    );

    try {
        if (!apiResponse || !("data" in apiResponse)) throw new Error("Error");
        if (apiResponse.status !== 200) throw new Error("Error");
        const json: Member[] = await apiResponse.data;
        const usersHallOfFame = getUsersHallOfFame({ members: json });

        const responseObj = { response: usersHallOfFame };
        setCache("hallOfFame", {
            data: responseObj,
        });
        res.send(responseObj);
    } catch (e) {
        res.status(404);
        res.send({ error: 404 });
    }
};

export default getHallOfFame;
