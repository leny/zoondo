/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/monkus/coco-boum.js - Tribes data: Monkus' Coco Boum trump resolver
 *
 * coded by leny
 * started at 02/05/2020
 */

/* eslint-disable no-shadow */

import {ACTIONS} from "data/constants";
import {resolveCard, resolveMoves} from "data/utils";

// Atout de tir, lancé par les Élites

export default (game, {source}, next) => {
    const hasCaster = game._checkTrumpCaster(source);

    if (!hasCaster) {
        return false;
    }

    const casters = game.board.filter(({player, card, x, y}) => {
        if (player !== source.player) {
            return false;
        }
        const caster = resolveCard(card);
        if (caster.type !== "ELITE") {
            return false;
        }

        const targets = resolveMoves(
            {x, y},
            resolveCard(source.card).target,
            !game.players[source.player].isFirstPlayer,
        )
            .flat()
            .map(cell => game._getCardAtPosition({x: cell[0], y: cell[1]}))
            .filter(
                crd => crd && ![source.player, "OBSTACLE"].includes(crd.player),
            );

        return targets.length > 0;
    });

    if (!casters.length) {
        // no targets
        return false;
    }

    game.stack.unshift({
        type: ACTIONS.SELECT_CARD,
        options: {
            player: source.player,
            source,
            choices: casters,
            text: "Choisissez l'Élite qui va lancer le tir.",
        },
        next: (caster, discard, game) => {
            if (!casters.find(({x, y}) => caster.x === x && caster.y === y)) {
                throw new Error("WTF"); // cheating?
                // TODO: handle this
            }

            const targets = resolveMoves(
                caster,
                resolveCard(source.card).target,
                !game.players[source.player].isFirstPlayer,
            )
                .flat()
                .map(cell => game._getCardAtPosition({x: cell[0], y: cell[1]}))
                .filter(
                    card =>
                        card &&
                        ![source.player, "OBSTACLE"].includes(card.player),
                );

            if (!targets.length) {
                // technically impossible
                throw new Error("No available targets");
            }

            game.stack.unshift({
                type: ACTIONS.SELECT_CARD,
                options: {
                    player: source.player,
                    source,
                    choices: targets,
                    text: "Choisissez la cible du tir.",
                },
                next: (target, discard, game) => {
                    if (
                        !targets.find(
                            ({x, y}) => target.x === x && target.y === y,
                        )
                    ) {
                        throw new Error("WTF"); // cheating?
                        // TODO: handle this
                    }

                    game.shoot(source, game._getCardAtPosition(target));
                },
            });

            next();
        },
    });

    return next();
};
