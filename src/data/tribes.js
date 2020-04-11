/* leny/zoondo
 *
 * /src/data/tribes.js - Tribes data
 *
 * coded by leny
 * started at 11/04/2020
 */

import boarix from "./tribes/europa-boarix.json";
import monkus from "./tribes/europa-monkus.json";
import rhinogoths from "./tribes/europa-rhinogoths.json";
import warus from "./tribes/europa-warus.json";

const tribes = new Map();

[boarix, monkus, rhinogoths, warus].forEach(tribe =>
    tribes.set(tribe.slug, tribe),
);

export default tribes;
