import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const getPartnerLogo = async (req: Request, res: Response) => {
    const img = req.params.name;
    if (img === undefined) {
        res.status(404);
        return;
    }
    const filePath = path.resolve(__dirname, `../static/img/partners/${img}`);

    if (fs.existsSync(filePath)) {
        res.setHeader("Content-Type", "image/png+jpeg+jpg+gif+webp");
        res.sendFile(filePath);
    } else {
        res.status(404);
        res.send({ error: "File not found" });
    }
};

export default getPartnerLogo;
