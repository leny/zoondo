/* leny/zoondo
 *
 * /src/server/core/utils/misc.js - Misc utils
 *
 * coded by leny
 * started at 10/04/2020
 */

import crypto from "crypto";

export const isTruthy = m => !!m;
export const isFalsy = m => !m;

export const wait = ms => new Promise(r => setTimeout(r, ms));

export const sha1 = s =>
    crypto.createHash("sha1").update(String(s)).digest("hex");

export const sha256 = s =>
    crypto.createHash("sha256").update(String(s)).digest("hex");
