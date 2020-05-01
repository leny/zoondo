/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/rhinogoths/bigoth.js - Tribes data: Rhinogoths' Bigoth power resolver
 *
 * coded by leny
 * started at 01/05/2020
 */

import {ACTIONS} from "data/constants";
import {resolveMoves} from "data/utils";

// Le combat se solde par une égalité.
// Tu recules un de tes Zoons sur une case libre adjacente
// de la rangée située derrière lui.

export default (game, {source}, next) => {
    const moves = [[[1, -1]], [[0, -1]], [[-1, -1]]];

    const choices = game.board.filter(
        card =>
            card.player === source.player &&
            resolveMoves(
                card,
                moves,
                !game.players[source.player].isFirstPlayer,
            )
                .flat()
                .every(([x, y]) => game._getCardAtPosition({x, y})),
    );

    if (!choices.length) {
        game._sendMessage(
            `Il n'y a aucune case libre adjacente derrière un de vos Zoons.`,
        );
        next();
        return;
    }

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices,
            moves,
            onlyFreeCells: true,
            text: `Veuillez déplacer l'un de vos Zoons.`,
        },
    });

    next();
};
