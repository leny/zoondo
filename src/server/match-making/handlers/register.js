/* leny/zoondo
 *
 * /src/server/match-making/handlers/register.js - Match Making handlers: register
 *
 * coded by leny
 * started at 12/04/2020
 */

import {shorthash} from "utils/misc";
import games from "core/games";
import Game from "game";

export default (server, socket) => ({player}) => {
    console.log("register:", player);

    const roomId = Object.values(socket.rooms).find(id =>
        id.startsWith("game-"),
    );

    if (roomId && games.has(roomId)) {
        console.log("player is back", {game: games.get(roomId)});
        return;
    }

    const gameRooms = Object.entries(server.adapter.rooms)
        .filter(([key]) => key.startsWith("game-"))
        .map(([key, value]) => ({id: key, ...value}));

    const createGame = () => {
        console.log("createGame");
        const id = `game-${shorthash(Date.now())}`;
        const game = new Game(server, id, {...player, id: socket.id});
        games.set(id, game);
        socket.join(id);
    };

    if (!gameRooms.length || gameRooms.every(({length}) => length === 2)) {
        createGame();
    } else {
        const {id} = gameRooms.find(({length}) => length === 1);

        socket.join(id);
        games.get(id).join({...player, id: socket.id});
    }
};
