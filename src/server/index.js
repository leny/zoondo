/* leny/zoondo
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny
 * started at 10/04/2020
 */

import {init as initExpressServer} from "core/express";
import io from "core/socket";
import initMatchMaking from "./match-making";

console.clear();

initMatchMaking(io);
initExpressServer();
