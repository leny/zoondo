/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/boarix/gold-hure.js - Tribes data: Boarix's Gold-Hure power resolver
 *
 * coded by leny
 * started at 20/04/2020
 */

import {ACTIONS} from "data/constants";

// Le combat se solde par une égalité.
// Si tu viens de déplacer Gold-Hure, tu le déplaces à nouveau.

export default (game, {source}, next) => {
    if (source.role !== "attacker") {
        game._sendMessage(
            `**Gold-Hure** n'étant pas l'attaquant dans ce combat, le pouvoir ne s'active pas.`,
        );
        next();
        return;
    }

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices: [game._getCardAtPosition(source)],
            text: "Veuillez déplacer **Gold-Hure** à nouveau.",
        },
    });

    next();
};
