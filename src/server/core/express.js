/* leny/zoondo
 *
 * /src/server/core/express.js - Express setup
 *
 * coded by leny
 * started at 10/04/2020
 */

import {APP_PORT, CLIENT_PATH} from "core/constants";

import express from "express";

const app = express();

app.use("/", express.static(CLIENT_PATH));

export const init = next =>
    app.listen(APP_PORT, () => {
        console.log(`Server launched & listening on port ${APP_PORT}.`);
        next && next();
    });
