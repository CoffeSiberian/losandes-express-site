import { Request, Response } from "express";
import { dataGet } from "../helpers/dataFetch";
import { ListMembers, Member } from "../types/api/discordTypes";
import { setCache } from "../helpers/cache";
import { AxiosRequestConfig } from "axios";
import {
    DISCORD_BOT_TOKEN,
    DISCORD_ID_SERVER,
    DISCORD_ROLES_ID,
} from "../helpers/configs";

const getUsersHallOfFame = (members: ListMembers): (Member | undefined)[] => {
    const discordRoles = DISCORD_ROLES_ID.roles_id;
    let usersHallOfFame: (Member | undefined)[] = [];

    members.members.map((member) => {
        let userRoles = member.roles;
        let userHallOfFame = userRoles.filter((role) => {
            if (role === undefined) return false;
            return discordRoles.includes(role);
        });

        if (userHallOfFame.length > 0) usersHallOfFame.push(member);
    });
    return usersHallOfFame;
};

const getHallOfFame = async (req: Request, res: Response) => {
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

        setCache("hallOfFame", {
            data: { response: usersHallOfFame },
        });
        res.send(usersHallOfFame);
    } catch (e) {
        res.status(404);
        res.send({ error: 404 });
    }
};

export default getHallOfFame;
