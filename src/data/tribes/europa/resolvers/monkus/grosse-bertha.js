/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/monkus/grosse-bertha.js - Tribes data: Monkus' Grosse Bertha trump resolver
 *
 * coded by leny
 * started at 02/05/2020
 */

import {ACTIONS, BOARD_COL_SIZE} from "data/constants";

// Vise un Zoon Ennemi situé dans ton camp.

export default (game, {source}, next) => {
    const choices = [];

    Array.from(new Array(BOARD_COL_SIZE).keys()).forEach(x =>
        (game.players[source.player].isFirstPlayer
            ? [0, 1, 2]
            : [3, 4, 5]
        ).forEach(y => {
            const card = game._getCardAtPosition({x, y});

            if (card && ![source.player, "OBSTACLE"].includes(card.player)) {
                choices.push({x, y});
            }
        }),
    );

    if (choices.length === 0) {
        // no available targets
        return false;
    }

    game.stack.unshift({
        type: ACTIONS.SELECT_CARD,
        options: {
            player: source.player,
            source,
            choices,
            text: "Ciblez un Zoon ennemi dans votre camp.",
        },
        next: target => {
            if (!choices.find(({x, y}) => target.x === x && target.y === y)) {
                throw new Error("WTF"); // cheating?
                // TODO: handle this
            }

            game.shoot(source, game._getCardAtPosition(target));
        },
    });

    return next();
};
