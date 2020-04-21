/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/boarix/bouclefeuille.js - Tribes data: Boarix's Bouclefeuille power resolver
 *
 * coded by leny
 * started at 21/04/2020
 */

import {ACTIONS, BOARD_ROW_SIZE, BOARD_COL_SIZE} from "data/constants";

// Le combat se solde par une égalité.
// Tu déplaces Bouclefeuille dans une case libre du champ de bataille.

export default (game, {source}, next) => {
    const moves = [];

    Array.from(new Array(BOARD_ROW_SIZE).keys()).forEach(x =>
        Array.from(new Array(BOARD_COL_SIZE).keys()).forEach(
            y =>
                !game._getCardAtPosition({x, y}) &&
                moves.push([[x, y, true, true]]),
        ),
    );

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices: [game._getCardAtPosition(source)],
            moves,
            onlyFreeCells: true,
            text:
                "Veuillez déplacer **Bouclefeuille** sur une case libre du champ de bataille.",
        },
    });

    next();
};
