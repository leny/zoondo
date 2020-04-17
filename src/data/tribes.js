/* leny/zoondo
 *
 * /src/data/tribes.js - Tribes data
 *
 * coded by leny
 * started at 11/04/2020
 */

import europaTribes from "./tribes/europa";

const tribes = new Map();

[...europaTribes].forEach(tribe => tribes.set(tribe.slug, tribe));

export default tribes;
