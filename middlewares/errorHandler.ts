import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.sendStatus(404);
};

export { errorHandler };
