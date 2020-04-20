/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/boarix/cloboulon.js - Tribes data: Boarix's Cloboulon power resolver
 *
 * coded by leny
 * started at 20/04/2020
 */

import {ACTIONS} from "data/constants";

// Le combat se solde par une égalité.
// Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.

export default (game, {source}, next) => {
    if (source.role !== "attacker") {
        game._sendMessage(
            `**Cloboulon** n'étant pas l'attaquant dans ce combat, le pouvoir ne s'active pas.`,
        );
        next();
        return;
    }

    const choices = game.board.filter(
        ({player, card: {slug}}) =>
            player === source.player &&
            ["grognard:0", "grognard:1"].includes(slug),
    );

    if (!choices.length) {
        game._sendMessage(
            `Il n'y a plus de **Grognard** en jeu. Le pouvoir ne s'active pas.`,
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
            text: "Veuillez déplacer un **Grognard**.",
        },
    });

    next();
};
