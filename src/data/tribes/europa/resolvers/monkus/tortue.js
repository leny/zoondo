/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/monkus/tortue.js - Tribes data: Monkus' Tortue trump resolver
 *
 * coded by leny
 * started at 01/05/2020
 */

/* eslint-disable no-shadow */

import {ACTIONS} from "data/constants";
import {resolveCard} from "data/utils";

// Déplace jusqu'à deux de tes Soldats, l'un après l'autre.
// Ils ajoutent un point à leurs scores de touche.

export default (game, {source}, next) => {
    const choices = game.board.filter(
        ({player, card}) =>
            player === source.player && resolveCard(card).type === "SOLDIER",
    );

    if (!choices.length) {
        // no available targets
        return false;
    }

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices,
            text:
                "Premier mouvement : veuillez déplacer un Soldat. Il ajouter un point à son score de touche.",
            corners: value => value + 1,
            discardable: true,
        },
        next: ({destination}, discard, game) => {
            const secondChoices = game.board.filter(
                ({player, card, x, y}) =>
                    player === source.player &&
                    resolveCard(card).type === "SOLDIER" &&
                    (destination
                        ? !(destination.x === x && destination.y === y)
                        : true),
            );

            if (!secondChoices.length) {
                // no available targets
                return false;
            }

            game.stack.unshift({
                type: ACTIONS.MOVE_CARD,
                options: {
                    player: source.player,
                    source,
                    choices: secondChoices,
                    text:
                        "Second mouvement : veuillez déplacer un Soldat. Il ajouter un point à son score de touche.",
                    corners: value => value + 1,
                    discardable: true,
                },
            });

            return true;
        },
    });

    game._removeTrumpFromHand(source);
    return next();
};
