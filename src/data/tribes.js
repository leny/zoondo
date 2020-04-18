/* leny/zoondo
 *
 * /src/data/tribes.js - Tribes data
 *
 * coded by leny
 * started at 11/04/2020
 */

import europaTribes from "./tribes/europa";

const tribes = new Map();
const editions = new Map();

const setBySlug = target => elt => target.set(elt.slug, elt);

[...europaTribes].forEach(setBySlug(tribes));

editions.set("europa", {slug: "europa", name: "Europa", tribes: europaTribes});

export default tribes;
export {tribes, editions};
