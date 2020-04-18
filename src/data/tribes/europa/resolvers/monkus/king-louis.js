/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/monkus/king-louis.js - Tribes data: Monkus' King Louis power resolver
 *
 * coded by leny
 * started at 18/04/2020
 */

// Le combat se solde par une égalité.
// King Louis et le Zoon ennemi échangent leur position sur le champ de bataille.,

export default (game, {source, target}, next) => {
    game._updateCardOnBoard(target, {x: source.x, y: source.y});
    game._updateCardOnBoard(source, {x: target.x, y: target.y});
    next();
};
