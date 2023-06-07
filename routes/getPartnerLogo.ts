import { Request, Response } from "express";
import { readdir } from "fs/promises";
import path from "path";

const getPartnerLogo = async (req: Request, res: Response) => {
    const img = req.params.name;
    if (img === undefined) {
        res.status(404);
        return;
    }
    const filePath = path.resolve(__dirname, `../static/img/partners/`);
    const files = await readdir(filePath);

    if (files.includes(img)) {
        res.setHeader("Content-Disposition", "inline");
        res.sendFile(filePath + "/" + img);
    } else {
        res.status(404);
        res.send({ error: "File not found" });
    }
};

export default getPartnerLogo;
