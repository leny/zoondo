/* leny/zoondo
 *
 * /src/core/utils/index.js - Utils
 *
 * coded by leny
 * started at 08/04/2020
 */

export const isTruthy = m => !!m;
export const isFalsy = m => !m;

// eslint-disable-next-line no-empty-function
export const noop = () => {};

export const wait = ms => new Promise(r => setTimeout(r, ms));
