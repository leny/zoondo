/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/warus/berserkorse.js - Tribes data: Warus' Berserkorse power resolver
 *
 * coded by leny
 * started at 17/04/2020
 */

// Le Berserkorse élimine le Zoon ennemi.

export default (game, {source, target}, next) => {
    game._eliminateCardAtPosition(target);
    if (source.role === "attacker") {
        game._updateCardOnBoard(source, {x: target.x, y: target.y});
    }
    next();
};
