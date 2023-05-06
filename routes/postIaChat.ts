import { Request, Response } from "express";
import { BASE_IA_URL, IA_CHAT_ENDPOINT } from "../helpers/configs";
import { iaResponseList, iaResponse } from "../types/api/iaResponseTypes";
import { dataPost } from "../helpers/dataFetch";

const postIaChat = async (req: Request, res: Response) => {
    const prompt: string = req.body.prompt;
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        Host: BASE_IA_URL,
        Origin: `https://${BASE_IA_URL}`,
        Referer: `https://${BASE_IA_URL}`,
        "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0",
        "Content-Type": "application/json",
    };

    const url = `https://${BASE_IA_URL}${IA_CHAT_ENDPOINT}`;

    const payload = {
        prompt: prompt,
        options: {
            parentMessageId: "0",
        },
    };

    const apiResponse = await dataPost(
        { headers },
        JSON.stringify(payload),
        url
    );

    try {
        if (!apiResponse || !("data" in apiResponse)) throw new Error("Error");
        if (apiResponse.status !== 200) throw new Error("Error");

        const response: string[] = apiResponse.data.split("\n");
        let messages: iaResponse[] = [];

        response.map((message) => {
            let jsonParse: iaResponse = JSON.parse(message);
            messages.push(jsonParse);
        });

        const json: iaResponseList = { messages: messages };

        res.send(json.messages[json.messages.length - 1].text);
    } catch (e) {
        res.status(404);
        res.send(JSON.stringify({ error: 404 }));
    }
};

export default postIaChat;
