/* leny/zoondo
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny
 * started at 10/04/2020
 */

import {init} from "core/express";
import io from "core/socket";
import {sha1} from "utils/misc";
import games from "core/games";
import Game from "game";

// TODO: extract this
io.on("connection", socket => {
    const server = io.sockets;

    socket.emit("message", {
        system: true,
        timestamp: Date.now(),
        content: "Connecté au serveur.",
    });

    socket.on("register", ({player}) => {
        console.log("register:", {player, socket});

        const roomId = Object.values(socket.rooms).find(id =>
            id.startsWith("game-"),
        );

        if (roomId && games.has(roomId)) {
            console.log("player is back", {game: games.get(roomId)});
            return;
        }

        const gameRooms = Object.entries(io.sockets.adapter.rooms)
            .filter(([key]) => key.startsWith("game-"))
            .map(([key, value]) => ({id: key, ...value}));

        const createGame = () => {
            const id = `game-${sha1(Date.now())}`;
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
    });
});

init();
