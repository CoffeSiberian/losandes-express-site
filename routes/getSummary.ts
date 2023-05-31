import { Request, Response } from "express";
import {
    ResponseTMP,
    Response as membersResponse,
} from "../types/api/tmp/members";
import { Response as playerResponse } from "../types/api/tmp/player_response_type";
import {
    TRUCKERSMP_API_URL,
    TRUCKERSMP_VTC_ID,
    DISCORD_INVITE_CODE,
    TRUCKERSMP_STAFF_ID,
} from "../helpers/configs";
import { dataGet } from "../helpers/dataFetch";
import { setCache } from "../helpers/cache";

const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
};

const countStaffMembers = (members: membersResponse): number => {
    let count = 0;
    members.members.map((member) => {
        if (TRUCKERSMP_STAFF_ID.staff_id.includes(member.role_id.toString())) {
            count++;
        }
    });
    return count;
};

const getLastMemberId = async (
    members: membersResponse
): Promise<playerResponse | null> => {
    const lastMember = members.members[members.members.length - 1];
    const userId = lastMember.user_id;

    const TMPapiResponseLastUserInfo = await dataGet(
        { headers: headers },
        `${TRUCKERSMP_API_URL}player/${userId}`
    );
    if (
        !TMPapiResponseLastUserInfo ||
        TMPapiResponseLastUserInfo.status !== 200
    ) {
        return null;
    }
    const tmpJsonLastUserInfo: playerResponse = await TMPapiResponseLastUserInfo
        .data.response;

    return tmpJsonLastUserInfo;
};

const getSummary = async (req: Request, res: Response) => {
    const TMPapiResponse = await dataGet(
        { headers: headers },
        `${TRUCKERSMP_API_URL}vtc/${TRUCKERSMP_VTC_ID}/members`
    );
    const DiscordResponse = await dataGet(
        { headers: headers },
        `https://discord.com/api/v10/invites/${DISCORD_INVITE_CODE}?with_counts=true&with_expiration=true`
    );

    try {
        if (!TMPapiResponse || !DiscordResponse) {
            throw new Error("Error");
        }
        if (TMPapiResponse.status !== 200 || DiscordResponse.status !== 200) {
            throw new Error("Error");
        }

        const tmpJson: ResponseTMP = await TMPapiResponse.data;
        const discordJson = await DiscordResponse.data;
        const tmpJsonLastUserInfo = await getLastMemberId(tmpJson.response);

        const jsonResponse = {
            vtc_members: tmpJson.response.members_count,
            discord_members: discordJson.approximate_member_count,
            staff_members: countStaffMembers(tmpJson.response),
            last_member: tmpJsonLastUserInfo,
        };

        setCache("summary", {
            data: jsonResponse,
        });

        res.json(jsonResponse);
    } catch (e) {
        res.status(404);
        res.send({ error: 404 });
    }
};

export default getSummary;
