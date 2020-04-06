/* leny/zoondo
 *
 * /src/core/types/game.js - Game-related custom PropTypes
 *
 * coded by leny
 * started at 06/04/2020
 */

import PropTypes from "prop-types";

export const PlayerShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    tribe: PropTypes.string.isRequired,
});
