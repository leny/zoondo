/* leny/zoondo
 *
 * /src/server/game/index.js - Game classes - main class
 *
 * coded by leny
 * started at 10/04/2020
 */

import tribes from "data/tribes";
import {sendSystemMessage} from "core/socket";
import {resolveMoves, resolveCard} from "data/utils";

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
        this._sendMessage("Partie créée. En attente d'un second joueur…");
        this._sendState();
    }

    join(secondPlayer) {
        this.players[secondPlayer.id] = {...secondPlayer, isFirstPlayer: false};
        const tribe = tribes.get(secondPlayer.tribe);
        Array.from(tribe.disposition)
            .reverse()
            .forEach((row, y) =>
                row.forEach((slug, x) =>
                    this.board.push({
                        player: secondPlayer.id,
                        x: 5 - x,
                        y: 5 - y,
                        card: {
                            tribe: secondPlayer.tribe,
                            type: "fighters",
                            slug,
                        },
                    }),
                ),
            );
        this._sendMessage(`**${secondPlayer.name}** a rejoint la partie.`);
        this._sendState();
        this.startTurn(Object.keys(this.players)[Math.round(Math.random())]);
    }

    leave(playerId) {
        const leavingPlayer = this.players[playerId];

        this._sendMessage(`**${leavingPlayer.name}** a quitté la partie.`);
    }

    startTurn(playerId) {
        this.turn.count++;
        this.turn.activePlayer = playerId;
        this.turn.phase = "main";
        this._sendState();
        this._sendMessage(
            `Début de tour : **${this.players[playerId].name}**.`,
        );
        console.log(
            "Starting turn:",
            playerId,
            this.players[playerId].name,
            this.players[playerId].isFirstPlayer
                ? "(first player)"
                : "(second player)",
        );
    }

    endTurn() {
        this._sendMessage("Fin de tour.");
        // TODO: close turn, clean stuffs if needed

        // return nextPlayer id
        return Object.keys(this.players).find(
            id => id !== this.turn.activePlayer,
        );
    }

    move(card, destination) {
        const [isValid, isCombat] = this._checkMove(card, destination);

        if (!isValid) {
            // TODO: send proper error
            this._sendMessage("**Error** - déplacement invalide");
            return;
        }

        if (isCombat) {
            // perform combat
            console.log("isCombat");
            this._sendMessage("**Combat** - not implemented yet.");
        } else {
            // perform move
            const cardIndex = this.board.findIndex(
                ({x, y}) => card.x === x && card.y === y,
            );
            this.board[cardIndex] = {
                ...this.board[cardIndex],
                ...destination,
            };
            this._sendState();
            this._sendMessageToActivePlayer(
                `**Déplacement** - _${resolveCard(card).name}_ de _${[
                    card.x,
                    card.y,
                ].join(",")}_ à _${[destination.x, destination.y].join(",")}_`,
            );
            this._sendMessageToInactivePlayer(
                `**Déplacement** - Zoon de _${[card.x, card.y].join(
                    ",",
                )}_ à _${[destination.x, destination.y].join(",")}_`,
            );
        }

        this.startTurn(this.endTurn());
    }

    _checkMove({x, y, ...cardInfos}, {x: dX, y: dY}) {
        const card = resolveCard(cardInfos);
        const moves = resolveMoves(
            {x, y},
            card.moves,
            !this.players[this.turn.activePlayer].isFirstPlayer,
        ).reduce((arr, move) => {
            move.reduce((keep, [mX, mY, isJump = false]) => {
                if (keep) {
                    const cardAtPosition = this.board.find(
                        crd => crd.x === mX && crd.y === mY,
                    );

                    if (cardAtPosition) {
                        if (cardAtPosition.player !== this.turn.activePlayer) {
                            arr.push([mX, mY, isJump, true]);
                        }

                        return false;
                    }

                    arr.push([mX, mY, isJump, false]);
                }

                return keep;
            }, true);

            return arr;
        }, []);

        const destination = moves.find(([mX, mY]) => dX === mX && dY === mY);

        return [!!destination, destination[3]];
    }

    _sendMessage(message) {
        sendSystemMessage(this.server.to(this.room), message);
    }

    _sendMessageToActivePlayer(message) {
        const id = this.turn.activePlayer;

        sendSystemMessage(this.server.sockets[id], message);
    }

    _sendMessageToInactivePlayer(message) {
        const id = Object.keys(this.players).find(
            playerId => playerId !== this.turn.activePlayer,
        );

        sendSystemMessage(this.server.sockets[id], message);
    }

    _sendState() {
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
