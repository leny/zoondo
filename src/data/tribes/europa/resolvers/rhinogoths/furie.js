/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/rhinogoths/furie.js - Tribes data: Rhinogoths' Furie trump resolver
 *
 * coded by leny
 * started at 01/05/2020
 */

import {ACTIONS} from "data/constants";
import {resolveCard} from "data/utils";

// Déplace un de tes Soldats. Il double son score de touche.

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
            text: "Veuillez déplacer un soldat. Il double son score de touche.",
            corners: value => value * 2,
        },
    });

    game._removeTrumpFromHand(source);
    return next();
};
