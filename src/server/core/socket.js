/* leny/zoondo
 *
 * /src/server/core/socket.js - SocketIO setup
 *
 * coded by leny
 * started at 10/04/2020
 */

import {server} from "core/express";
import socketIO from "socket.io";
import {shorthash} from "utils/misc";

const io = socketIO(server);

export default io;

export const sendSystemMessage = (socket, content) =>
    socket.emit("message", {
        id: shorthash(process.hrtime()),
        system: true,
        timestamp: Date.now(),
        content,
    });

export const getGameRooms = rooms =>
    Object.entries(rooms)
        .filter(([key]) => key.startsWith("game-"))
        .map(([key, value]) => ({id: key, ...value}));
