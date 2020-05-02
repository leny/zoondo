/* leny/zoondo
 *
 * /src/data/tribes/commons/resolvers/shooting-trump.js - Tribes data: Commons Shooting Trump resolver
 *
 * coded by leny
 * started at 02/05/2020
 */

/* eslint-disable no-shadow */

import {ACTIONS} from "data/constants";
import {resolveTrumpUsableBy} from "data/utils";

// Atout de tir, lancé par les Élites

export default (
    selectCasterText,
    selectTargetText = "Choisissez la cible du tir.",
) => (game, {source}, next) => {
    const hasCaster = game._checkTrumpCaster(source);

    if (!hasCaster) {
        return false;
    }

    const casters = game._getValidCastersForShootingTrump(
        source,
        resolveTrumpUsableBy(source.card),
    );

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
            text: selectCasterText,
        },
        next: (caster, discard, game) => {
            if (!casters.find(({x, y}) => caster.x === x && caster.y === y)) {
                throw new Error("WTF"); // cheating?
                // TODO: handle this
            }

            const targets = game._getValidTargetsFromShootingTrumpCaster(
                source,
                caster,
            );

            if (!targets.length) {
                // technically impossible
                throw new Error("No valid targets");
            }

            game.stack.unshift({
                type: ACTIONS.SELECT_CARD,
                options: {
                    player: source.player,
                    source,
                    choices: targets,
                    text: selectTargetText,
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
