import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import http from "http";
import routes from "./routes/router";
import cors from "cors";
import { PORT } from "./helpers/configs";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
routes(app);

const httpServer = http.createServer(app);
console.log(`Server is running on port ${PORT}`);
httpServer.listen(PORT);
