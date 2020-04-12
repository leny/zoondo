/* leny/zoondo
 *
 * /src/server/core/express.js - Express setup
 *
 * coded by leny
 * started at 10/04/2020
 */

import {APP_PORT, CLIENT_PATH} from "core/constants";

import express from "express";
import http from "http";

const app = express();
export const server = http.Server(app);

app.use("/", express.static(CLIENT_PATH));

export const init = next => {
    server.listen(APP_PORT);
    console.log(`Server launched & listening on port ${APP_PORT}.`);
    next && next();
};

export default app;
