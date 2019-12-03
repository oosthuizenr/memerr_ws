import * as express from 'express';
const bodyParser = require('body-parser');
import logger from "./logging";
import { handlMemesRequest } from "./handlers/memes"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/ping", (request: express.Request, response: express.Response) => {
    response.status(204).end();
});

app.get("/memes", async (request: express.Request, response: express.Response) => {
    await handlMemesRequest(request, response);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}`);
});

module.exports = app;