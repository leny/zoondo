/* leny/zoondo
 *
 * /src/server/game/index.js - Game classes - main class
 *
 * coded by leny
 * started at 10/04/2020
 */

export default class Game {
    server = null;
    room = null;
    players = {};
    state = "waiting";
    turn = {
        count: 0,
        activePlayer: null,
        phase: null,
    };
    board = [];
    supports = [];
    trumps = [];

    constructor(server, roomId, firstPlayer) {
        this.server = server;
        this.room = roomId;
        this.players[firstPlayer.id] = {...firstPlayer, isFirstPlayer: true};
        this.sendMessage("Game room created. Waiting for player two...");
        this.sendState();
    }

    join(secondPlayer) {
        this.players[secondPlayer.id] = secondPlayer;
        this.sendMessage(`**${secondPlayer.name}** joined the game.`);
        this.sendState();
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
                turn: this.turn,
                player: this.players[id],
                opponent: Object.values(this.players).find(
                    player => player.id !== id,
                ),
            };

            this.server.sockets[id].emit("state", state);
        });
    }
}
