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
import cloneDeep from "lodash.clonedeep";

export default class Game {
    server = null;
    room = null;
    players = {};
    turn = {
        count: 0,
        activePlayer: null,
        phase: "waiting",
        combat: null,
        timer: 30,
    };
    board = [];
    supports = [];
    trumps = [];
    graveyard = [];

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
        this.turn.combat = null;
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

    endGame(winnerId) {
        this.turn.phase = "end";
        this.turn.winner = this.players[winnerId];
        this._sendState();
        this._sendMessage(
            `Partie terminée, **${this.players[winnerId].name}** a éliminé l'emblème de son adversaire.
[Rechargez](javascript:location.reload(true)) pour démarrer une nouvelle partie.`,
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
            this.turn.phase = "combat";
            this.turn.combat = {
                step: "choice",
                attacker: cloneDeep(this._getCardAtPosition(card.x, card.y)),
                defender: cloneDeep(
                    this._getCardAtPosition(destination.x, destination.y),
                ),
            };
            this._sendMessage("**Combat** - lancement d'un combat.");
            this._sendState();
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

            this.startTurn(this.endTurn());
        }
    }

    combatChooseCorner(player, cornerIndex) {
        // encode corner
        ["attacker", "defender"].forEach(side => {
            if (this.turn.combat[side].player !== player) {
                // randomly rotate corners at 180º before computation
                const corner = ([0, 2].includes(cornerIndex) ? [0, 2] : [1, 3])[
                    Math.round(Math.random())
                ];
                this.turn.combat[side].cornerIndex = corner;
                this.turn.combat[side].value = resolveCard(
                    this.turn.combat[side].card,
                ).corners[corner];
            }
        });

        // resolve combat
        let gameWinner;

        if (
            ["attacker", "defender"].every(
                side => this.turn.combat[side].value != null,
            )
        ) {
            const {attacker, defender} = this.turn.combat;
            const attackerValue = attacker.value;
            const defenderValue = defender.value;

            this.turn.combat.step = "resolve";

            if (attackerValue === defenderValue) {
                this._sendMessage(
                    `**Combat** - le combat se solde par une égalité. Chaque Zoon conserve sa position - **NOTE:** ce comportement n'est pas tout à fait conforme aux règles, il sera implémenté correctement sous peu.`,
                );
                this.turn.combat.winner = "draw";
                // TODO: resolve draw
            } else if (attackerValue === "*") {
                this._sendMessage(
                    `**Combat** - le _${
                        resolveCard(attacker.card).name
                    }_ de **${
                        this.players[attacker.player].name
                    }** active son pouvoir (_${
                        resolveCard(attacker.card).power
                    }_) - **NOTE:** les pouvoirs ne sont pas encore implémentés, ce résultat est comptabilisé comme une égalité.`,
                );
                this.turn.combat.winner = "draw";
                this.turn.combat.withPower = "attacker";
                // TODO: resolve attacker's power
            } else if (defenderValue === "*") {
                this._sendMessage(
                    `**Combat** - le _${
                        resolveCard(defender.card).name
                    }_ de **${
                        this.players[defender.player].name
                    }** active son pouvoir (_${
                        resolveCard(defender.card).power
                    }_) - **NOTE:** les pouvoirs ne sont pas encore implémentés, ce résultat est comptabilisé comme une égalité.`,
                );
                this.turn.combat.winner = "draw";
                this.turn.combat.withPower = "defender";
                // TODO: resolve defender's power
            } else if (attackerValue > defenderValue) {
                // attacker wins
                this._sendMessage(
                    `**Combat** - le _${
                        resolveCard(attacker.card).name
                    }_ de **${
                        this.players[attacker.player].name
                    }** élimine le _${resolveCard(defender.card).name}_ de **${
                        this.players[defender.player].name
                    }** et prend sa place en _${[defender.x, defender.y].join(
                        ",",
                    )}_.`,
                );
                this.turn.combat.winner = "attacker";
                const attackerBoardIndex = this.board.findIndex(
                    cell => cell.x === attacker.x && cell.y === attacker.y,
                );
                const defenderBoardIndex = this.board.findIndex(
                    cell => cell.x === defender.x && cell.y === defender.y,
                );
                this.board[attackerBoardIndex] = {
                    ...this.board[attackerBoardIndex],
                    x: defender.x,
                    y: defender.y,
                };
                const [deadCard] = this.board.splice(defenderBoardIndex, 1);
                if (resolveCard(deadCard.card).type === "EMBLEM") {
                    gameWinner = attacker.player;
                }
                this.graveyard.push(deadCard);
            } else {
                // defender wins
                this._sendMessage(
                    `**Combat** - le _${
                        resolveCard(defender.card).name
                    }_ de **${
                        this.players[defender.player].name
                    }** élimine le _${resolveCard(attacker.card).name}_ de **${
                        this.players[attacker.player].name
                    }** et conserve sa position.`,
                );
                this.turn.combat.winner = "defender";
                const attackerBoardIndex = this.board.findIndex(
                    cell => cell.x === attacker.x && cell.y === attacker.y,
                );
                const [deadCard] = this.board.splice(attackerBoardIndex, 1);
                if (resolveCard(deadCard.card).type === "EMBLEM") {
                    gameWinner = defender.player;
                }
                this.graveyard.push(deadCard);
            }

            this._sendState();

            setTimeout(() => {
                // TODO: resolve powers!

                if (gameWinner) {
                    this.endGame(gameWinner);
                    return;
                }
                this.startTurn(this.endTurn());
            }, 5000);
        }
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

    _getCardAtPosition(x, y) {
        return this.board.find(cell => x === cell.x && y === cell.y);
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
                    ...cloneDeep(this.turn),
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

            if (state.turn.phase === "combat") {
                if (["choice", "wait"].includes(state.turn.combat.step)) {
                    ["attacker", "defender"].forEach(side => {
                        if (state.turn.combat[side].player !== id) {
                            state.turn.combat[side].card = {
                                tribe: state.turn.combat[side].card.tribe,
                            };
                        }
                    });
                }
            }

            if (this.server.sockets[id]) {
                this.server.sockets[id].emit("state", state);
            }
        });
    }
}
