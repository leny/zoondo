/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/warus/conque-de-charge.js - Tribes data: Warus' Conque de Charge trump resolver
 *
 * coded by leny
 * started at 01/05/2020
 */

/* eslint-disable no-shadow */ // I know.

import {ACTIONS} from "data/constants";

// Déplace jusqu'à trois de tes Zoons, l'un après l'autre.

export default (game, {source}, next) => {
    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices: game.board.filter(({player}) => player === source.player),
            text: "Premier mouvement : veuillez déplacer un Zoon.",
            discardable: true,
        },
        next: ({destination: firstDestination}, discard, game) =>
            game.stack.unshift({
                type: ACTIONS.MOVE_CARD,
                options: {
                    player: source.player,
                    source,
                    choices: game.board.filter(
                        ({player, ...firstMoveCell}) =>
                            player === source.player &&
                            (firstDestination
                                ? !(
                                      firstMoveCell.x === firstDestination.x &&
                                      firstMoveCell.y === firstDestination.y
                                  )
                                : true),
                    ),
                    text: "Second mouvement : veuillez déplacer un Zoon.",
                    discardable: true,
                },
                next: ({destination: secondDestination}, discard, game) =>
                    game.stack.unshift({
                        type: ACTIONS.MOVE_CARD,
                        options: {
                            player: source.player,
                            source,
                            choices: game.board.filter(
                                ({player, ...secondMoveCell}) =>
                                    player === source.player &&
                                    (firstDestination
                                        ? !(
                                              secondMoveCell.x ===
                                                  firstDestination.x &&
                                              secondMoveCell.y ===
                                                  firstDestination.y
                                          )
                                        : true) &&
                                    (secondDestination
                                        ? !(
                                              secondMoveCell.x ===
                                                  secondDestination.x &&
                                              secondMoveCell.y ===
                                                  secondDestination.y
                                          )
                                        : true),
                            ),
                            text:
                                "Troisième mouvement : veuillez déplacer un Zoon.",
                            discardable: true,
                        },
                    }),
            }),
    });

    game._removeTrumpFromHand(source);
    next();
};
