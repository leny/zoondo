/* leny/zoondo
 *
 * /src/server/match-making/handlers/forward-to-game.js - Match Making: forward to game
 *
 * coded by leny
 * started at 13/04/2020
 */

import games from "core/games";
import {getGameRooms} from "core/socket";

export default (_, socket, callback) => (...args) => {
    const room = getGameRooms(socket.rooms)[0];

    callback(games.get(room.id), ...args);
};
