/* leny/zoondo
 *
 * /src/client/components/tools/card-corners.js - CardCorners
 *
 * coded by leny
 * started at 07/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {usePwops} from "@pwops/react-hooks";
import {rem, percent, radialGradient} from "@pwops/core";

import {Corners} from "types";

const getCharacter = s => {
    if (s === "*") {
        return "★";
    }

    return s;
};

const CardCorners = ({
    className,
    corners,
    forCombat = false,
    selectedCornerIndex,
}) => {
    const styles = usePwops({
        container: {
            relative: true,
            size: percent(100),
        },
        element: {
            display: "block",
            size: rem(forCombat ? 3.6 : 2.4),
            flexColumn: ["center", "center"],
            borderRadius: percent(100),
            backgroundImage: radialGradient("at top left", "yellow", "orange"),
            fontSize: rem(forCombat ? 2.8 : 2),
            lineHeight: rem(forCombat ? 3.6 : 2.4),
            color: "black",
        },
        topLeft: {
            absolute: [0, false, false, 0],
        },
        topRight: {
            absolute: [0, 0, false, false],
        },
        bottomLeft: {
            absolute: [false, false, 0, 0],
        },
        bottomRight: {
            absolute: [false, 0, 0, false],
        },
        selected: {
            size: rem(forCombat ? 4.2 : 3.6),
            lineHeight: rem(forCombat ? 4.2 : 3.6),
            fontSize: rem(forCombat ? 3.4 : 2.8),
            backgroundImage: radialGradient("at top left", "cyan", "blue"),
            color: "white",
        },
    });

    const stylesMapping = ["topLeft", "topRight", "bottomRight", "bottomLeft"];

    return (
        <div css={styles.container} className={className}>
            {Array.from(new Array(4).keys()).map(i => (
                <span
                    key={`corner-${i}`}
                    css={[
                        styles.element,
                        styles[stylesMapping[i]],
                        selectedCornerIndex === i && styles.selected,
                    ]}>
                    {getCharacter(corners[i])}
                </span>
            ))}
        </div>
    );
};

CardCorners.propTypes = {
    corners: Corners,
    selectedCornerIndex: PropTypes.number,
    forCombat: PropTypes.bool,
};

export default CardCorners;
