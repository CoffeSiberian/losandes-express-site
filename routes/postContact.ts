import { Request, Response } from "express";
import { dataPost } from "../helpers/dataFetch";
import { ContactBodyValid } from "../types/contactBodyTypes";
import { DISCORD_WEBHOOK_URL } from "../helpers/configs";

const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
};

const postContact = async (req: Request, res: Response) => {
    const bodyData: ContactBodyValid = req.body;
    const ip_address: string | string[] = req.headers["x-forwarded-for"]
        ? req.headers["x-forwarded-for"]
        : req.socket.remoteAddress
        ? req.socket.remoteAddress
        : "None";

    const ip_address_to_send: string = ip_address.toString().split(",")[0];

    const nowTimestamp = Math.floor(new Date().getTime() / 1000);

    const payload = {
        username: "Web Contact System",
        avatar_url: "https://i.imgur.com/xz34fmF.jpg",
        embeds: [
            {
                title: bodyData.reason,
                color: 2829617,
                author: {
                    name: bodyData.name,
                    icon_url: "https://i.imgur.com/NCVmFul.png",
                },
                footer: {
                    text: `IP: ${ip_address_to_send}`,
                },
                fields: [
                    {
                        name: "Email",
                        value: bodyData.email,
                        inline: true,
                    },
                    {
                        name: "Discord",
                        value: bodyData.discord ? bodyData.discord : "None",
                        inline: true,
                    },
                    {
                        name: "Date",
                        value: `<t:${nowTimestamp}:F> \n\n <t:${nowTimestamp}:R>`,
                        inline: false,
                    },
                ],
                description: bodyData.message,
            },
        ],
    };

    const apiResponse = await dataPost(
        { headers },
        JSON.stringify(payload),
        DISCORD_WEBHOOK_URL
    );
    try {
        if (!apiResponse) throw new Error("Error");
        if (apiResponse.status >= 300 || apiResponse.status < 200) {
            throw new Error("Error");
        }
        res.sendStatus(200);
    } catch (e) {
        res.status(404);
        res.send(JSON.stringify({ error: 404 }));
    }
};

export default postContact;
