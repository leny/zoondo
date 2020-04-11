/* leny/zoondo
 *
 * /src/server/data/tribes.js - Tribes data
 *
 * coded by leny
 * started at 11/04/2020
 */

import boarix from "../../data/tribes/europa-boarix.json";
import monkus from "../../data/tribes/europa-monkus.json";
import rhinogoths from "../../data/tribes/europa-rhinogoths.json";
import warus from "../../data/tribes/europa-warus.json";

const tribes = new Map();

[boarix, monkus, rhinogoths, warus].forEach(tribe =>
    tribes.set(tribe.slug, tribe),
);

export default tribes;
