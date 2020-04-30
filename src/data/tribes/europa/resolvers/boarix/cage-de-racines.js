/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/boarix/cage-de-racines.js - Tribes data: Boarix's Cage de Racines trump resolver
 *
 * coded by leny
 * started at 30/04/2020
 */

import {ACTIONS, BOARD_COL_SIZE} from "data/constants";
import {resolveCard} from "data/utils";

// Place la Cage de racines sur un Zoon ennemi situé dans ta zone de déploiement.
// Il devient un Obstacle sans déplacement jusqu'à la fin de la partie.

export default (game, {source}, next) => {
    const hasCaster = game._checkTrumpCaster(source);

    if (!hasCaster) {
        return false;
    }

    const choices = [];

    Array.from(new Array(BOARD_COL_SIZE).keys()).forEach(x =>
        (game.players[source.player].isFirstPlayer ? [0, 1] : [4, 5]).forEach(
            y => {
                const card = game._getCardAtPosition({x, y});

                if (
                    card &&
                    ![source.player, "OBSTACLE"].includes(card.player)
                ) {
                    choices.push({x, y});
                }
            },
        ),
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
            text:
                "Veuillez choisir un Zoon ennemie dans votre zone de déploiement.",
        },
        next: choice => {
            if (!choices.find(({x, y}) => choice.x === x && choice.y === y)) {
                throw new Error("WTF"); // cheating?
                // TODO: handle this
            }

            const card = game._getCardAtPosition(choice);

            game._updateCardOnBoard(
                choice,
                {
                    x: choice.x,
                    y: choice.y,
                    player: "OBSTACLE",
                    card: {
                        ...source.card,
                        type: "obstacles",
                        originalType: source.card.type,
                    },
                    bottomCard: card.card,
                },
                true,
            );
            game._sendMessage(
                `**Atout** - **${game.players[source.player].name}** place **${
                    resolveCard(source.card).name
                }** sur votre **${resolveCard(card.card).name}** (en _${[
                    choice.x,
                    choice.y,
                ].join(",")}_).`,
            );
            game._removeTrumpFromHand(source);
            next();
        },
    });

    return next();
};
