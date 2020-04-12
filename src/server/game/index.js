/* leny/zoondo
 *
 * /src/server/game/index.js - Game classes - main class
 *
 * coded by leny
 * started at 10/04/2020
 */

import tribes from "data/tribes";

export default class Game {
    server = null;
    room = null;
    players = {};
    turn = {
        count: 0,
        activePlayer: null,
        phase: "waiting",
        timer: 30,
    };
    board = [];
    supports = [];
    trumps = [];

    constructor(server, roomId, firstPlayer) {
        this.server = server;
        this.room = roomId;
        this.players[firstPlayer.id] = {...firstPlayer, isFirstPlayer: true};
        const tribe = tribes.get(firstPlayer.tribe);
        Array.from(tribe.disposition)
            .reverse()
            .forEach((row, y) =>
                row.forEach((slug, x) =>
                    this.board.push({
                        player: firstPlayer.id,
                        x,
                        y,
                        card: {
                            tribe: firstPlayer.tribe,
                            type: "fighters",
                            slug,
                        },
                    }),
                ),
            );
        this.sendMessage("Game room created. Waiting for player two...");
        this.sendState();
    }

    join(secondPlayer) {
        this.players[secondPlayer.id] = secondPlayer;
        const tribe = tribes.get(secondPlayer.tribe);
        Array.from(tribe.disposition)
            .reverse()
            .forEach((row, y) =>
                row.forEach((slug, x) =>
                    this.board.push({
                        player: secondPlayer.id,
                        x,
                        y: 5 - y,
                        card: {
                            tribe: secondPlayer.tribe,
                            type: "fighters",
                            slug,
                        },
                    }),
                ),
            );
        this.sendMessage(`**${secondPlayer.name}** joined the game.`);
        this.sendState();
    }

    leave(playerId) {
        const leavingPlayer = this.players[playerId];

        this.sendMessage(`**${leavingPlayer.name}** left the game.`);
    }

    sendMessage(message) {
        this.server.to(this.room).emit("message", {
            system: true,
            timestamp: Date.now(),
            content: message,
        });
    }

    sendState() {
        Object.values(this.players).forEach(({id}) => {
            const state = {
                turn: {
                    ...this.turn,
                    activePlayer: this.turn.activePlayer
                        ? this.players[this.turn.activePlayer]
                        : null,
                },
                player: this.players[id],
                opponent: Object.values(this.players).find(
                    player => player.id !== id,
                ),
                board: this.board.map(
                    ({player, x, y, card: {tribe, type, slug}}) => ({
                        player,
                        x,
                        y,
                        card: player === id ? {tribe, type, slug} : {tribe},
                    }),
                ),
            };

            if (this.server.sockets[id]) {
                this.server.sockets[id].emit("state", state);
            }
        });
    }
}
