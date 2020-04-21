/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/rhinogoths/trice-ratops.js - Tribes data: Rhinogoths' Trice & Ratops power resolver
 *
 * coded by leny
 * started at 21/04/2020
 */

import {ACTIONS} from "data/constants";
import {resolveMoves, resolveCard} from "data/utils";

// Le combat se solde par une égalité.
// Ton adversaire recule son Zoon sur l'une des trois cases adjacentes
// de la rangée située derrière lui.
// Toutefois, si aucune case n'est libre ou si ce mouvement fait sortir
// le Zoon du champ de bataille, il conserve sa position.

export default (game, {target}, next) => {
    const targetCard = resolveCard(target.card);
    const moves = [[[1, -1]], [[0, -1]], [[-1, -1]]];

    if (
        resolveMoves(target, moves, !game.players[target.player].isFirstPlayer)
            .flat()
            .every(([x, y]) => game._getCardAtPosition({x, y}))
    ) {
        game._sendMessage(
            `Il n'y a aucune case libre adjacente derrière le **${targetCard.name}**. Il conserve sa position.`,
        );
        next();
        return;
    }

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: target.player,
            source: target,
            choices: [game._getCardAtPosition(target)],
            moves,
            onlyFreeCells: true,
            text: `Veuillez déplacer **${targetCard.name}**.`,
        },
    });

    next();
};
