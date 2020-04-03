/* leny/zoondo
 *
 * /src/components/styles/global.js - Styles Components: Global
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import {Global, css} from "@emotion/core";
import boxSizingReset from "emotion-box-sizing-reset";
import meyerReset from "emotion-meyer-reset";
import {percent, size} from "koutla-swiss";

const StylesGlobal = () => (
    <>
        <Global styles={css(meyerReset)} />
        <Global styles={css(boxSizingReset)} />
        <Global
            styles={css({
                html: {
                    ...size(percent(100)),
                    background: "black",
                    color: "white",
                },
                body: {
                    ...size(percent(100)),
                },
                "#app": {
                    ...size(percent(100)),
                },
            })}
        />
    </>
);

export default StylesGlobal;
