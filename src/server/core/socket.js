/* leny/zoondo
 *
 * /src/server/core/socket.js - SocketIO setup
 *
 * coded by leny
 * started at 10/04/2020
 */

import {server} from "core/express";
import socketIO from "socket.io";

const io = socketIO(server);

export default io;

export const sendSystemMessage = (socket, content) =>
    socket.emit("message", {system: true, timestamp: Date.now(), content});
