/* leny/zoondo
 *
 * /src/components/tools/card-corners.js - CardCorners
 *
 * coded by leny
 * started at 07/04/2020
 */

import React from "react";

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
    corners: [topLeft, topRight, bottomRight, bottomLeft],
}) => {
    const styles = usePwops({
        container: {
            relative: true,
            size: rem(7),
        },
        element: {
            display: "block",
            size: rem(2.4),
            flexColumn: ["center", "center"],
            borderRadius: percent(100),
            backgroundImage: radialGradient("at top left", "yellow", "orange"),
            fontSize: rem(2),
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
    });

    return (
        <div css={styles.container} className={className}>
            <span css={[styles.element, styles.topLeft]}>
                {getCharacter(topLeft)}
            </span>
            <span css={[styles.element, styles.topRight]}>
                {getCharacter(topRight)}
            </span>
            <span css={[styles.element, styles.bottomLeft]}>
                {getCharacter(bottomLeft)}
            </span>
            <span css={[styles.element, styles.bottomRight]}>
                {getCharacter(bottomRight)}
            </span>
        </div>
    );
};

CardCorners.propTypes = {
    corners: Corners,
};

export default CardCorners;
