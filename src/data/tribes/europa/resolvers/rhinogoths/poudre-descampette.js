/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/rhinogoths/poudre-descampette.js - Tribes data: Rhinogoths' Poudre d'Escampette trump resolver
 *
 * coded by leny
 * started at 01/05/2020
 */

/* eslint-disable no-shadow, no-confusing-arrow */ // I know.

import {ACTIONS} from "data/constants";

// Recule jusqu'à trois de tes Zoons, chacun sur
// une case adjacente libre de la rangée située derrière lui.

export default (game, {source}, next) => {
    const moves = [[[1, -1]], [[0, -1]], [[-1, -1]]];

    game.stack.unshift({
        type: ACTIONS.MOVE_CARD,
        options: {
            player: source.player,
            source,
            choices: game.board.filter(({player}) => player === source.player),
            text: "Premier mouvement : veuillez déplacer un Zoon.",
            moves,
            onlyFreeCells: true,
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
                    moves,
                    onlyFreeCells: true,
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
                            moves,
                            onlyFreeCells: true,
                            discardable: true,
                        },
                    }),
            }),
    });

    game._removeTrumpFromHand(source);
    next();
};
