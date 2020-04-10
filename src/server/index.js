/* leny/zoondo
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny
 * started at 10/04/2020
 */

import {init} from "core/express";
import io from "core/socket";

// TODO: extract this
io.on("connection", socket => {
    socket.emit("message", {
        system: true,
        timestamp: Date.now(),
        content: "Connecté au serveur.",
    });

    socket.on("register", ({player}) => console.log("register:", player));
});

init();
