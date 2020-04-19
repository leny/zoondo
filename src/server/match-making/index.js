/* leny/zoondo
 *
 * /src/server/match-making/index.js - Match Making setup
 *
 * coded by leny
 * started at 12/04/2020
 */

import {sendSystemMessage} from "core/socket";
import register from "./handlers/register";
import forwardToGame from "./handlers/forward-to-game";
import disconnecting from "./handlers/disconnecting";

export default io => {
    const server = io.sockets;

    io.on("connection", socket => {
        sendSystemMessage(socket, "Connecté au serveur.");

        socket.on("register", register(server, socket));
        socket.on("disconnecting", disconnecting(server, socket));

        socket.on(
            "move",
            forwardToGame(server, socket, (game, {card, destination}) =>
                game.move(card, destination),
            ),
        );
        socket.on(
            "combat",
            forwardToGame(server, socket, (game, {action, index}) => {
                if (action === "choose") {
                    game.fight(socket.id, index);
                }
            }),
        );
        socket.on(
            "action",
            forwardToGame(server, socket, (game, params) =>
                game.resolveAction(params),
            ),
        );
    });
};
