/* leny/zoondo
 *
 * /src/server/match-making/handlers/disconnecting.js - Match Making handlers: disconnecting
 *
 * coded by leny
 * started at 12/04/2020
 */

import {getGameRooms, sendSystemMessage} from "core/socket";
import games from "core/games";

export default (server, socket) => reason => {
    console.log(`disconnecting(reason: ${reason})`);

    getGameRooms(socket.rooms).forEach(({id}) => {
        const game = games.get(id);

        if (game) {
            game.leave(socket.id);
            games.delete(id);
        }

        sendSystemMessage(
            server.to(id),
            "Partie terminée. [Rechargez](javascript:location.reload(true)) pour démarrer une nouvelle partie.",
        );

        const room = server.adapter.rooms[id];

        if (room) {
            Object.keys(room.sockets).forEach(socketId => room.del(socketId));
        }
    });
};
