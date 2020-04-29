/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/boarix/mur-darbres.js - Tribes data: Boarix's Mur d'Arbres trump resolver
 *
 * coded by leny
 * started at 29/04/2020
 */

import {ACTIONS, BOARD_ROW_SIZE, BOARD_COL_SIZE} from "data/constants";

// Place le Mur d'Arbres sur une case libre du champ de bataille.
// Cette case devient un Obstacle jusqu'à la fin de la partie.

export default (game, {source}, next) => {
    const choices = [];

    Array.from(new Array(BOARD_ROW_SIZE).keys()).forEach(x =>
        Array.from(new Array(BOARD_COL_SIZE).keys()).forEach(
            y => !game._getCardAtPosition({x, y}) && choices.push([x, y]),
        ),
    );

    game.stack.unshift({
        type: ACTIONS.SELECT_CELL,
        options: {
            player: source.player,
            source,
            choices,
            text: "Sélectionner une case libre pour y placer le Mur d'Arbres",
        },
        next: ({x, y}) => {
            game.board.push({
                x,
                y,
                player: "OBSTACLE",
                card: {
                    ...source.card,
                    type: "obstacles",
                    originalType: source.card.type,
                },
            });
            const index = game.players[source.player].trumps.findIndex(
                ({tribe, slug}) =>
                    source.card.tribe === tribe && source.card.slug === slug,
            );
            const [trump] = game.players[source.player].trumps.splice(index, 1);
            game.graveyard.push(trump);
            next();
        },
    });

    next();
};
