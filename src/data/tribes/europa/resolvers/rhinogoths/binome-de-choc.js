/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/rhinogoths/binome-de-choc.js - Tribes data: Rhinogoths' Binôme de Choc trump resolver
 *
 * coded by leny
 * started at 01/05/2020
 */

/* eslint-disable no-shadow, no-confusing-arrow */ // I know.

import {ACTIONS} from "data/constants";
import {resolveCard} from "data/utils";

// Déplace jusqu'à deux de tes Élites ou Monstres, l'un après l'autre

export default (game, {source}, next) => {
    const choices = game.board.filter(
        ({player, card}) =>
            player === source.player &&
            ["ELITE", "MONSTER"].includes(resolveCard(card).type),
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
                "Premier mouvement : veuillez déplacer un Élite ou un Monstre.",
            discardable: true,
        },
        next: ({destination}, discard, game) => {
            const secondChoices = game.board.filter(
                ({player, card, x, y}) =>
                    player === source.player &&
                    ["ELITE", "MONSTER"].includes(resolveCard(card).type) &&
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
                        "Second mouvement : veuillez déplacer un Élite ou un Monstre.",
                    discardable: true,
                },
            });

            return true;
        },
    });

    game._removeTrumpFromHand(source);
    return next();
};
