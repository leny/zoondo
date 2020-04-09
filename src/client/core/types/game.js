/* leny/zoondo
 *
 * /src/client/core/types/game.js - Game-related custom PropTypes
 *
 * coded by leny
 * started at 06/04/2020
 */

import PropTypes from "prop-types";
import {FIGHTER_TYPES} from "core/constants";

export const PlayerShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    tribe: PropTypes.string.isRequired,
});

export const Corners = PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
);

export const Moves = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array));

export const FighterVariant = PropTypes.shape({
    corners: Corners,
    moves: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)),
});

export const FighterShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(FIGHTER_TYPES).isRequired,
    variants: PropTypes.arrayOf(FighterVariant),
    corners: Corners,
    power: PropTypes.string,
    value: PropTypes.number.isRequired,
    moves: Moves,
});
