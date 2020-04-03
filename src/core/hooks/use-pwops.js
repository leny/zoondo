/* leny/zoondo
 *
 * /src/core/hooks/use-pwops.js - custom hook: usePwops
 *
 * coded by leny
 * started at 04/04/2020
 */

import {useMemo} from "react";
import {css} from "@pwops/emotion-css";

export const usePwops = styles =>
    useMemo(
        () =>
            Object.fromEntries(
                Object.entries(styles).map(([key, value]) => [key, css(value)]),
            ),
        [styles],
    );
