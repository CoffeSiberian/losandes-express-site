import express, { Express } from "express";
import errorHandler from "./middlewares/errorHandler";
import http from "http";
import routes from "./routes/router";
import cors from "cors";
import { PORT, ALLOWEDHEADERS, ALLOWEDORIGIN } from "./helpers/configs";

const app: Express = express();

app.use(
    cors({
        origin: ALLOWEDORIGIN,
        allowedHeaders: ALLOWEDHEADERS,
    })
);
app.use(express.json());
routes(app);
app.use(errorHandler);

const httpServer = http.createServer(app);
console.log(`Server is running on port ${PORT}`);
httpServer.listen(PORT);
