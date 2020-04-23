/* leny/zoondo
 *
 * /src/client/core/constants.js - Constants
 *
 * coded by leny
 * started at 03/04/2020
 */

export const ZOONDO_ENV = process.env.ZOONDO_ENV;
export const NODE_ENV = process.env.NODE_ENV;
export const VERSION = process.env.VERSION;
export const BUILD_TIME = process.env.BUILD_TIME;
export const DEBUG_MODE = process.env.DEBUG_MODE;

export const SERVER_PATH = process.env.SERVER_PATH;

export const CELL_SIZE = 120;
export const GAP_SIZE = 4;

export const NBSP = "\u00a0";

export const BCG_COLOR = "black";
export const TEXT_COLOR = "white";
export const BORDER_COLOR = "#666";

export const SOURCE_SANS_PRO_STACK = `"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif`;

export const FIGHTER_TYPES = [
    "CHIEF",
    "HERO",
    "PRIEST",
    "MONSTER",
    "ELITE",
    "SOLDIER",
    "EMBLEM",
];
export const CARD_TYPES = {
    FIGHTER: "fighters",
    TRUMP: "trumps",
};
