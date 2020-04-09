/* leny/zoondo
 *
 * /src/client/components/styles/global.js - Styles Components: Global
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import {Global} from "@emotion/core";
import {percent, vw, vh, px} from "@pwops/core";
import {css} from "@pwops/emotion-css";
import boxSizingReset from "emotion-box-sizing-reset";
import meyerReset from "emotion-meyer-reset";

import {
    BCG_COLOR,
    TEXT_COLOR,
    SOURCE_SANS_PRO_STACK,
} from "../../core/constants";

const StylesGlobal = () => (
    <>
        <Global styles={css(meyerReset)} />
        <Global styles={css(boxSizingReset)} />
        <Global
            styles={css({
                html: {
                    size: [vw(100), vh(100)],
                    background: BCG_COLOR,
                    font: [
                        "normal",
                        `${percent(62.5)}/1.5`,
                        SOURCE_SANS_PRO_STACK,
                    ],
                    color: TEXT_COLOR,
                },
                body: {
                    size: percent(100),
                },
                "#app": {
                    size: percent(100),
                    padding: [px(1), 0, 0],
                },
            })}
        />
    </>
);

export default StylesGlobal;
