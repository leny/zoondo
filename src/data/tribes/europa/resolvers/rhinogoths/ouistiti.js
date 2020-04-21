/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/rhinogoths/ouistiti.js - Tribes data: Rhinogoths' Ouistiti power resolver
 *
 * coded by leny
 * started at 21/04/2020
 */

import {ACTIONS} from "data/constants";

// Le combat se solde par une égalité.
// Déplace ton Ouistiti sur une case adjacente libre de ton choix.
// Si aucune case n'est libre, ton Ouistiti conserve sa position.

export default (game, {source}, next) => {
    const moves = [
        [[-1, 0]],
        [[-1, 1]],
        [[0, 1]],
        [[1, 1]],
        [[1, 0]],
        [[1, -1]],
        [[0, -1]],
        [[-1, -1]],
    ];

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices: [game._getCardAtPosition(source)],
            moves,
            onlyFreeCells: true,
            text: "Veuillez déplacer **Ouistiti**.",
        },
    });

    next();
};
