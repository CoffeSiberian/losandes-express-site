import { Request, Response } from "express";
import { getFetch } from "../helpers/dataFetch";
import { ListMembers, Member } from "../types/api/discordTypes";
import { queryCache } from "../helpers/cache";
import {
    DISCORD_BOT_TOKEN,
    DISCORD_ID_SERVER,
    DISCORD_ROLES_ID,
} from "../helpers/configs";

const getUsersHallOfFame = (members: ListMembers): (Member | undefined)[] => {
    let usersHallOfFame: (Member | undefined)[] = [];
    let discordRoles = DISCORD_ROLES_ID.roles;

    members.members.map((member) => {
        let userRoles = member.roles;
        let userHallOfFame = userRoles.filter((role) =>
            discordRoles.includes(role)
        );
        if (userHallOfFame.length > 0) usersHallOfFame.push(member);
    });
    return usersHallOfFame;
};

const getHallOfFame = async (req: Request, res: Response) => {
    let apiResponse = await getFetch(
        null,
        { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
        new URL(
            `https://discord.com/api/guilds/${DISCORD_ID_SERVER}/members?limit=1000`
        )
    );
    try {
        let json = await apiResponse.json();
        let usersHallOfFame = getUsersHallOfFame(apiResponse);

        queryCache.set("hallOfFame", {
            data: { response: usersHallOfFame },
            status: apiResponse.status,
        });
        res.send(usersHallOfFame);
    } catch (e) {
        res.status(404);
        res.send({ error: 404 });
    }
};

export default getHallOfFame;
